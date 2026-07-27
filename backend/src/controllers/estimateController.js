const Estimate = require("../models/Estimate");
const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");

// @desc    Get paginated estimates with search, sorting & status filter
// @route   GET /api/estimates
exports.getEstimates = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const skip = (page - 1) * limit;

    const { search, status, sortBy = "createdAt", order = "desc" } = req.query;

    let query = {};

    // Search filter across ID, eId, clientName, and email
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { clientName: searchRegex },
        { eId: searchRegex },
        { email: searchRegex },
      ];
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Sort definition
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
      pages: Math.ceil(total / limit),
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

// @desc    Export Estimates as XLSX document
// @route   GET /api/estimates/export/excel
exports.exportEstimatesExcel = async (req, res, next) => {
  try {
    // 1. Optional: Apply query filters if user exports filtered lists
    const { search, status } = req.query;
    let query = {};

    if (search) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(safeSearch, "i");
      query.$or = [
        { clientName: searchRegex },
        { eId: searchRegex },
        { email: searchRegex },
      ];
    }
    if (status) query.status = status;

    // Fetch data using cursor for memory efficiency with large datasets
    const cursor = Estimate.find(query).lean().cursor();

    // 2. Initialize Excel Workbook & Sheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Estimates Report");

    // Define columns with widths & keys
    worksheet.columns = [
      { header: "Estimate ID", key: "eId", width: 16 },
      { header: "Client Name", key: "clientName", width: 25 },
      { header: "Mobile", key: "mobile", width: 16 },
      { header: "Email", key: "email", width: 28 },
      { header: "Estimate Date", key: "eDate", width: 15 },
      { header: "Expiration Date", key: "expDate", width: 15 },
      { header: "Country", key: "country", width: 12 },
      { header: "Amount ($)", key: "amount", width: 15 },
      { header: "Status", key: "status", width: 14 },
    ];

    // Style Header Row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" }, // Navy blue accent
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    // 3. Populate Rows from Cursor
    for await (const estimate of cursor) {
      const row = worksheet.addRow({
        eId: estimate.eId,
        clientName: estimate.clientName,
        mobile: estimate.mobile,
        email: estimate.email,
        eDate: estimate.eDate ? new Date(estimate.eDate).toLocaleDateString() : "",
        expDate: estimate.expDate ? new Date(estimate.expDate).toLocaleDateString() : "",
        country: estimate.country || "USA",
        amount: estimate.amount,
        status: estimate.status,
      });

      // Format Amount as Currency
      const amountCell = row.getCell("amount");
      amountCell.numFmt = '"$"#,##0.00';
    }

    // 4. Set Headers & Stream Output
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