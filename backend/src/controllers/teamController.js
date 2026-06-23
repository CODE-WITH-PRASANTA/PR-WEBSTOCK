const TeamMember = require("../models/TeamMember");
const fs = require("fs");
const path = require("path");

// Create
exports.createTeamMember = async (
  req,
  res
) => {
  try {
    const member =
      await TeamMember.create({
        name: req.body.name,
        designation:
          req.body.designation,
        image: req.file.path,
      });

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
exports.getTeamMembers = async (
  req,
  res
) => {
  try {
    const members =
      await TeamMember.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single
exports.getTeamMember = async (
  req,
  res
) => {
  try {
    const member =
      await TeamMember.findById(
        req.params.id
      );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
exports.updateTeamMember = async (
  req,
  res
) => {
  try {
    const member =
      await TeamMember.findById(
        req.params.id
      );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    let imagePath = member.image;

    if (req.file) {
      imagePath = req.file.path;

      const oldImage = path.join(
        process.cwd(),
        member.image.replace("/", "")
      );

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }
    }

    const updated =
      await TeamMember.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          designation:
            req.body.designation,
          image: imagePath,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
exports.deleteTeamMember = async (
  req,
  res
) => {
  try {
    const member =
      await TeamMember.findById(
        req.params.id
      );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const imagePath = path.join(
      process.cwd(),
      member.image.replace("/", "")
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await member.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};