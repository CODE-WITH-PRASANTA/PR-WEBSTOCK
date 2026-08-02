const Estimate = require("../models/Estimate");
const ExcelJS = require("exceljs");

/**
 * Builds Mongo query matching search term (mobile, client, email, etc.)
 * and a single date range across eDate OR expDate.
 */
const buildEstimateQuery = (queryParams) => {
  const { search, status, startDate, endDate } = queryParams;
  let query = {};

  // 1. Universal Search (Mobile, Client, Email, ID, Country, Status, Details, Amount)
  if (search) {
    const trimmedSearch = search.trim();
    const safeSearch = trimmedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(safeSearch, "i");

    query.$or = [
      { mobile: searchRegex },
      { clientName: searchRegex },
      { eId: searchRegex },
      { email: searchRegex },
      { country: searchRegex },
      { status: searchRegex },
      { details: searchRegex },
    ];

    // If search value is numeric, check exact match on amount
    const numericSearch = Number(trimmedSearch);
    if (!isNaN(numericSearch)) {
      query.$or.push({ amount: numericSearch });
    }
  }

  // 2. Status Filter
  if (status) {
    query.status = status;
  }

  // 3. Combined Date Range Filter (Matches if eDate OR expDate is in the range)
  if (startDate || endDate) {
    const dateRangeCondition = {};

    if (startDate) {
      dateRangeCondition.$gte = new Date(startDate);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include full end date
      dateRangeCondition.$lte = end;
    }

    const dateOrConditions = [
      { eDate: dateRangeCondition },
      { expDate: dateRangeCondition },
    ];

    // Merge with existing $or condition from search keyword if present
    if (query.$or) {
      query = {
        $and: [
          { $or: query.$or },
          { $or: dateOrConditions }
        ]
      };
      if (status) query.status = status;
    } else {
      query.$or = dateOrConditions;
    }
  }

  return query;
};

// @desc    Get paginated estimates with search, sorting & date filter
// @route   GET /api/estimates
exports.getEstimates = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const skip = (page - 1) * limit;

    const { sortBy = "createdAt", order = "desc" } = req.query;
    const query = buildEstimateQuery(req.query);

    const sortOptions = {};
    sortOptions[sortBy] = order === "asc" ? 1 : -1;

    const [estimates, total] = await Promise.all([
      Estimate.find(query).sort(sortOptions).skip(skip).limit(limit),
      Estimate.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: estimates.length,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      data: estimates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single estimate by ID
// @route   GET /api/estimates/:id
exports.getEstimateById = async (req, res, next) => {
  try {
    const estimate = await Estimate.findById(req.params.id);
    if (!estimate) {
      return res.status(404).json({ success: false, message: "Estimate not found" });
    }
    res.status(200).json({ success: true, data: estimate });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new estimate
// @route   POST /api/estimates
exports.createEstimate = async (req, res, next) => {
  try {
    const estimate = await Estimate.create(req.body);
    res.status(201).json({ success: true, data: estimate });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing estimate
// @route   PUT /api/estimates/:id
exports.updateEstimate = async (req, res, next) => {
  try {
    const estimate = await Estimate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!estimate) {
      return res.status(404).json({ success: false, message: "Estimate not found" });
    }

    res.status(200).json({ success: true, data: estimate });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete single estimate
// @route   DELETE /api/estimates/:id
exports.deleteEstimate = async (req, res, next) => {
  try {
    const estimate = await Estimate.findByIdAndDelete(req.params.id);

    if (!estimate) {
      return res.status(404).json({ success: false, message: "Estimate not found" });
    }

    res.status(200).json({ success: true, message: "Estimate deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk Delete estimates
// @route   POST /api/estimates/bulk-delete
exports.bulkDeleteEstimates = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "Please provide an array of IDs" });
    }

    const result = await Estimate.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} estimate(s) deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export Estimates as XLSX document (with filters applied)
// @route   GET /api/estimates/export/excel
exports.exportEstimatesExcel = async (req, res, next) => {
  try {
    const query = buildEstimateQuery(req.query);

    // Stream query records using cursor
    const cursor = Estimate.find(query).lean().cursor();

    // Setup Excel Workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Estimates Report");

    worksheet.columns = [
      { header: "Estimate ID", key: "eId", width: 16 },
      { header: "Client Name", key: "clientName", width: 25 },
      { header: "Mobile", key: "mobile", width: 18 },
      { header: "Email", key: "email", width: 28 },
      { header: "Estimate Date", key: "eDate", width: 15 },
      { header: "Expiration Date", key: "expDate", width: 15 },
      { header: "Country", key: "country", width: 12 },
      { header: "Amount ($)", key: "amount", width: 15 },
      { header: "Status", key: "status", width: 14 },
      { header: "Details", key: "details", width: 30 },
    ];

    // Header Styling
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    // Stream Data Rows
    for await (const estimate of cursor) {
      const row = worksheet.addRow({
        eId: estimate.eId,
        clientName: estimate.clientName,
        mobile: estimate.mobile || "",
        email: estimate.email || "",
        eDate: estimate.eDate ? new Date(estimate.eDate).toLocaleDateString("en-GB") : "",
        expDate: estimate.expDate ? new Date(estimate.expDate).toLocaleDateString("en-GB") : "",
        country: estimate.country || "USA",
        amount: estimate.amount,
        status: estimate.status,
        details: estimate.details || "",
      });

      const amountCell = row.getCell("amount");
      amountCell.numFmt = '"$"#,##0.00';
    }

    // Output XLSX File
    const filename = `Estimates_Report_${new Date().toISOString().slice(0, 10)}.xlsx`;
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};