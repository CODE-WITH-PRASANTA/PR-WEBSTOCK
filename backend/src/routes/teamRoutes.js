const express = require("express");

const router = express.Router();

const {
  createTeamMember,
  getTeamMembers,
  getTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

const {
  upload,
  singleImageUpload,
} = require("../middleware/multer");

router.post(
  "/",
  upload.single("image"),
  singleImageUpload,
  createTeamMember
);

router.get("/", getTeamMembers);

router.get("/:id", getTeamMember);

router.put(
  "/:id",
  upload.single("image"),
  singleImageUpload,
  updateTeamMember
);

router.delete(
  "/:id",
  deleteTeamMember
);

module.exports = router;