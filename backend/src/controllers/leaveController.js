const Leave = require('../models/Leave');

// @desc    Apply for a leave
// @route   POST /api/leaves
const applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, halfDay, reason } = req.body;

    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({ success: false, message: 'Please fill out all required fields.' });
    }

    const newLeave = new Leave({
      user: req.employee._id,
      employeeName: req.employee.name,
      leaveType,
      fromDate,
      toDate,
      halfDay: halfDay || 'No',
      reason
    });

    const savedLeave = await newLeave.save();
    res.status(201).json({ success: true, message: 'Leave applied successfully!', data: savedLeave });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

// @desc    Get all leaves (For Admin/HR Dashboard)
// @route   GET /api/leaves
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leaves.length, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get logged-in employee's leaves
// @route   GET /api/leaves/my-leaves
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.employee._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leaves.length, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      data: leave,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get leave balances grouped by employee
// @route   GET /api/leaves/balances
const getLeaveBalances = async (req, res) => {
  try {
    const balances = await Leave.aggregate([
      {
        $facet: {
          // Process calculations for approved vs rejected vs pending
          statsPerEmployee: [
            {
              $group: {
                _id: "$user",
                employeeName: { $first: "$employeeName" },
                // Calculate total leaves used (Approved ones)
                acceptedCount: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "Approved"] }, 1, 0]
                  }
                },
                rejectedCount: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0]
                  }
                },
                // If you want to compute the exact sum of DAYS instead of just record count:
                usedDays: {
                  $sum: {
                    $cond: [
                      { $eq: ["$status", "Approved"] },
                      {
                        $divide: [
                          { $subtract: ["$toDate", "$fromDate"] },
                          1000 * 60 * 60 * 24 // Converts milliseconds to days
                        ]
                      },
                      0
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    ]);

    // Format the computed values to match your frontend requirements
    const formattedBalances = balances[0].statsPerEmployee.map(emp => {
      const totalAllocated = 25; // Default max leaves allowed per year
      const used = Math.ceil(emp.usedDays || emp.acceptedCount); // fallbacks cleanly 
      
      return {
        id: emp._id,
        employee: emp.employeeName,
        image: "https://i.pravatar.cc/150?img=3", // Fallback avatar string
        previous: 0,
        current: totalAllocated - used,
        total: totalAllocated,
        used: used,
        accepted: emp.acceptedCount,
        rejected: emp.rejectedCount,
        expired: 0,
        carry: 0
      };
    });

    res.status(200).json({ success: true, data: formattedBalances });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Make sure to export it alongside your existing controllers:
module.exports = { applyLeave, getAllLeaves, getMyLeaves, updateLeaveStatus, getLeaveBalances };


