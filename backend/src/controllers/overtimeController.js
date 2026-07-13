const Overtime = require('../models/Overtime');

exports.submitOvertime = async (req, res) => {
  try {
    const { date, hours, reason } = req.body;
    
    // req.employee comes from your auth middleware
    const newRequest = await Overtime.create({
      employeeId: req.employee._id,
      name: req.employee.name,          // Saving the name
      empDisplayId: req.employee.employeeId, // Saving the custom empId string
      date,
      hours,
      reason
    });

    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET: Fetch requests for the logged-in user
exports.getMyOvertime = async (req, res) => {
  try {
    const requests = await Overtime.find({ employeeId: req.employee._id })
      .sort({ createdAt: -1 });
      
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET: Admin - Fetch all overtime requests
exports.getAllOvertimeRequests = async (req, res) => {
  try {
    const requests = await Overtime.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateOvertimeStatus = async (req, res) => {
  try {
    const { status } = req.body; 
    
    // Professional check: Ensure only valid transitions
    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const request = await Overtime.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.json({ success: true, message: "Status updated successfully", data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};