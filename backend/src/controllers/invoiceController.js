const Invoice = require('../models/Invoice');

// Helper: generate recurring EMI array if frontend doesn't supply it
const generateSchedule = (startMonthYear, dayOfMonth, months, perMonthAmount) => {
  if (!startMonthYear || !months) return [];
  const [yearStr, monthStr] = startMonthYear.split('-');
  const startYear = parseInt(yearStr, 10);
  const startMonthIndex = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayOfMonth, 10) || 1;

  const schedule = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < months; i++) {
    const dueDate = new Date(startYear, startMonthIndex + i, day);
    const monthLabel = dueDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    const initialStatus = today >= dueDate ? 'Pending' : 'Upcoming';

    schedule.push({
      installmentNo: i + 1,
      monthLabel,
      dueDate,
      amount: perMonthAmount,
      status: initialStatus,
      paidDate: null
    });
  }
  return schedule;
};

// @desc    Get all invoices with pagination, search, and category filter
// @route   GET /api/invoices
exports.getInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    if (category) {
      filter.projectCategory = category;
    }

    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { itemNo: searchRegex },
        { clientName: searchRegex },
        { projectName: searchRegex },
        { projectDomain: searchRegex },
        { email: searchRegex },
        { mobile: searchRegex }
      ];
    }

    const [invoices, totalRecords] = await Promise.all([
      Invoice.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Invoice.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      data: invoices,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalRecords / limitNum) || 1,
        totalRecords
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve invoices',
      error: error.message
    });
  }
};

// @desc    Get single invoice details
// @route   GET /api/invoices/:id
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    return res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new contract invoice
// @route   POST /api/invoices
exports.createInvoice = async (req, res) => {
  try {
    const payload = { ...req.body };

    // Auto-generate invoice number if missing
    if (!payload.itemNo) {
      payload.itemNo = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    // Auto-assign slNo
    const count = await Invoice.countDocuments();
    payload.slNo = count + 1;

    // Build schedule if not explicitly provided
    if (!payload.emiSchedule || payload.emiSchedule.length === 0) {
      const total = Number(payload.totalCost) || 0;
      const advance = Number(payload.advanceCost) || 0;
      const tenure = Number(payload.emiMonths) > 0 ? Number(payload.emiMonths) : 1;
      const balance = Math.max(0, total - advance);
      const monthlyEmi = Math.round((balance / tenure) * 100) / 100;

      payload.emiSchedule = generateSchedule(
        payload.emiStartMonth,
        payload.emiDayOfMonth,
        tenure,
        monthlyEmi
      );
    }

    const newInvoice = new Invoice(payload);
    await newInvoice.save();

    return res.status(201).json({
      success: true,
      message: 'Contract invoice created successfully',
      data: newInvoice
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to create invoice',
      error: error.message
    });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    Object.assign(invoice, req.body);
    await invoice.save();

    return res.status(200).json({
      success: true,
      message: 'Contract invoice updated successfully',
      data: invoice
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to update invoice',
      error: error.message
    });
  }
};

// @desc    Update single EMI installment status (matches inline quick-modal)
// @route   PATCH /api/invoices/:id/emi/:installmentNo
exports.updateEmiStatus = async (req, res) => {
  try {
    const { id, installmentNo } = req.params;
    const { status, paidDate } = req.body;

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const installment = invoice.emiSchedule.find(
      (inst) => inst.installmentNo === parseInt(installmentNo, 10)
    );

    if (!installment) {
      return res.status(404).json({ success: false, message: 'Installment item not found' });
    }

    installment.status = status;
    installment.paidDate = status === 'Paid' ? (paidDate || new Date()) : null;

    await invoice.save();

    return res.status(200).json({
      success: true,
      message: `Installment #${installmentNo} marked as ${status}`,
      data: invoice
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to update installment status',
      error: error.message
    });
  }
};

// @desc    Update Advance payment status directly (table select)
// @route   PATCH /api/invoices/:id/advance-status
exports.updateAdvanceStatus = async (req, res) => {
  try {
    const { advanceStatus } = req.body;
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    invoice.advanceStatus = advanceStatus;
    if (advanceStatus === 'Paid') {
      invoice.advancePaidDate = new Date();
    }

    await invoice.save();

    return res.status(200).json({
      success: true,
      message: 'Advance payment status updated',
      data: invoice
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Contract invoice deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};