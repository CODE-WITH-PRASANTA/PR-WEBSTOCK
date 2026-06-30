const express = require("express");

const router =
  express.Router();

const {
  createCareer,
  getAllCareers,
  getCareer,
  updateCareer,
  deleteCareer,
} = require(
  "../controllers/careerController"
);

router.post(
  "/",
  createCareer
);

router.get(
  "/",
  getAllCareers
);

router.get(
  "/:id",
  getCareer
);

router.put(
  "/:id",
  updateCareer
);

router.delete(
  "/:id",
  deleteCareer
);

module.exports = router;