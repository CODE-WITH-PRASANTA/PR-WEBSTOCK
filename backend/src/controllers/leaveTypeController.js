// controllers/leaveTypeController.js
const LeaveType = require("../models/LeaveType");

// @desc    Get all leave types (Supports optional search query)
// @route   GET /api/leave-types
const getLeaveTypes = async (req, res) => { // Fixed parameters here
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.leaveName = { $regex: search, $options: "i" };
    }

    const leaveTypes = await LeaveType.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: leaveTypes.length,
      data: leaveTypes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new leave type
// @route   POST /api/leave-types
const createLeaveType = async (req, res) => {
  try {
    const newLeaveType = await LeaveType.create(req.body);
    res.status(201).json({ success: true, data: newLeaveType });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update an existing leave type
// @route   PUT /api/leave-types/:id
const updateLeaveType = async (req, res) => {
  try {
    const leaveType = await LeaveType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!leaveType) {
      return res.status(404).json({ success: false, message: "Leave type not found" });
    }

    res.status(200).json({ success: true, data: leaveType });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a single leave type
// @route   DELETE /api/leave-types/:id
const deleteLeaveType = async (req, res) => {
  try {
    const leaveType = await LeaveType.findByIdAndDelete(req.params.id);

    if (!leaveType) {
      return res.status(404).json({ success: false, message: "Leave type not found" });
    }

    res.status(200).json({ success: true, message: "Leave type deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Bulk Delete selected leave types
// @route   POST /api/leave-types/bulk-delete
const bulkDeleteLeaveTypes = async (req, res) => {
  try {
    const { ids } = req.body; 
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "Please provide an array of IDs to delete" });
    }

    await LeaveType.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Selected leave types deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLeaveTypes,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
  bulkDeleteLeaveTypes
};