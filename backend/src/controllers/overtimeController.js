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