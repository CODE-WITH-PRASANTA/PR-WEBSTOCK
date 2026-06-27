require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./src/config/db");

const teamRoutes = require("./src/routes/teamRoutes");
<<<<<<< HEAD

const projectRoutes = require(
  "./src/routes/projectRoutes"
);


const careerRoutes =
  require("./src/routes/careerRoutes");

  const blogRoutes = require("./src/routes/blogRoutes");

  const industryRoutes = require("./src/routes/industryRoutes");

=======
const projectRoutes = require("./src/routes/projectRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const careerRoutes = require("./src/routes/careerRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
>>>>>>> 8d71b5ebaf125ee8f3d7a53f17b02cf8e9dfae12

const app = express();

// ==============================
// Connect MongoDB
// ==============================

connectDB();

// ==============================
// Middlewares
// ==============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==============================
// Static Upload Folder
// ==============================

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads"))
);

// ==============================
// API Routes
// ==============================

app.use("/api/team-members", teamRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/testimonial", testimonialRoutes);

app.use("/api/careers", careerRoutes);

app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);

// ==============================
// Home Route
// ==============================

app.use("/api/industries", industryRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PR-WEBSTOCK Backend Running Successfully 🚀",
  });
});

// ==============================
// 404 Route
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// Global Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});