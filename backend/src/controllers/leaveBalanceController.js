const LeaveType = require("../models/LeaveType");
const Leave = require("../models/Leave");
const EmployeeLeaveBalance = require("../models/EmployeeLeaveBalance");
const AddEmployee = require("../models/AddEmployee");

// Helper function to accurately count leave days spanning a date range
const calculateLeaveDays = (from, to, halfDay) => {
  if (halfDay === "Yes" || halfDay === true) return 0.5;
  if (!from || !to) return 0;
  
  const start = new Date(from);
  const end = new Date(to);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

// GET single employee balance (for the logged-in employee layout)
exports.getEmployeeBalance = async (req, res) => {
  try {
    const employeeId = req.employee._id;
    const activeLeaveTypes = await LeaveType.find({ status: "Active" });
    const activeTypeIds = activeLeaveTypes.map(type => type._id.toString());

    // Provision ledger spaces dynamically
    for (const type of activeLeaveTypes) {
      await EmployeeLeaveBalance.findOneAndUpdate(
        { employee: employeeId, leaveType: type._id },
        { 
          $setOnInsert: {
            employee: employeeId,
            leaveType: type._id,
            leaveName: type.leaveName,
            allocatedTotal: type.maxLimit || 0,
            manuallyCredited: 0,
            usedLeaves: 0,
            availableLeaves: type.maxLimit || 0
          }
        },
        { upsert: true }
      );
    }

    const approvedLeaves = await Leave.find({ user: employeeId, status: "Approved" });
    const balances = await EmployeeLeaveBalance.find({ 
      employee: employeeId,
      leaveType: { $in: activeTypeIds } 
    });

    const updatedBalances = await Promise.all(
      balances.map(async (bal) => {
        const matchingApproved = approvedLeaves.filter(
          (l) => l.leaveType.toLowerCase() === bal.leaveName.toLowerCase()
        );

        const totalUsed = matchingApproved.reduce((sum, item) => {
          return sum + calculateLeaveDays(item.fromDate, item.toDate, item.halfDay);
        }, 0);

        bal.usedLeaves = totalUsed;
        bal.availableLeaves = Math.max(0, (bal.allocatedTotal + bal.manuallyCredited) - totalUsed);
        await bal.save();
        
        return {
          title: bal.leaveName,
          total: bal.allocatedTotal + bal.manuallyCredited,
          used: bal.usedLeaves,
          available: bal.availableLeaves
        };
      })
    );

    res.status(200).json({ success: true, data: updatedBalances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all balances across the company (Management UI View)
exports.getAllEmployeeBalances = async (req, res) => {
  try {
    const employees = await AddEmployee.find({}, "name profileImage email");
    const activeLeaveTypes = await LeaveType.find({ status: "Active" });
    
    // Auto-provision ledger cards
    for (const emp of employees) {
      for (const type of activeLeaveTypes) {
        await EmployeeLeaveBalance.findOneAndUpdate(
          { employee: emp._id, leaveType: type._id },
          { 
            $setOnInsert: {
              employee: emp._id,
              leaveType: type._id,
              leaveName: type.leaveName,
              allocatedTotal: type.maxLimit || 0,
              manuallyCredited: 0,
              usedLeaves: 0,
              availableLeaves: type.maxLimit || 0
            }
          },
          { upsert: true }
        );
      }
    }

    const allBalances = await EmployeeLeaveBalance.find()
      .populate("employee", "name profileImage email")
      .populate("leaveType", "leaveName");

    const finalData = await Promise.all(
      allBalances.map(async (bal) => {
        if (!bal.employee) return null; 

        const approvedLeaves = await Leave.find({ user: bal.employee._id, status: "Approved" });
        const matchingApproved = approvedLeaves.filter(
          (l) => l.leaveType.toLowerCase() === bal.leaveName.toLowerCase()
        );

        const totalUsed = matchingApproved.reduce((sum, item) => {
          return sum + calculateLeaveDays(item.fromDate, item.toDate, item.halfDay);
        }, 0);

        bal.usedLeaves = totalUsed;
        bal.availableLeaves = Math.max(0, (bal.allocatedTotal + bal.manuallyCredited) - totalUsed);
        await bal.save();

        return {
          id: bal._id,
          employeeId: bal.employee._id,
          employee: bal.employee.name,
          email: bal.employee.email,
          image: bal.employee.profileImage || "https://i.pravatar.cc/150?img=1",
          leaveName: bal.leaveName,
          allocatedTotal: bal.allocatedTotal,
          manuallyCredited: bal.manuallyCredited,
          total: bal.allocatedTotal + bal.manuallyCredited,
          used: bal.usedLeaves,
          available: bal.availableLeaves
        };
      })
    );

    res.status(200).json({ success: true, data: finalData.filter(item => item !== null) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update manual allocation adjustment 
exports.updateEmployeeBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const { manuallyCredited } = req.body;

    const balance = await EmployeeLeaveBalance.findById(id);
    if (!balance) {
      return res.status(404).json({ success: false, message: "Balance ledger instance record missing." });
    }

    balance.manuallyCredited = Number(manuallyCredited) || 0;
    balance.availableLeaves = Math.max(0, (balance.allocatedTotal + balance.manuallyCredited) - balance.usedLeaves);

    await balance.save();
    res.status(200).json({ success: true, message: "Balance configuration synchronized successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE drop ledger assignment record instance
exports.deleteEmployeeBalance = async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeeLeaveBalance.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Record cleared down successfully from live datasets." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};