require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./src/config/db");

// ==============================
// Route Imports
// ==============================

const teamRoutes = require("./src/routes/teamRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const careerRoutes = require("./src/routes/careerRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const industryRoutes = require("./src/routes/industryRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");
const addEmployeeRoutes = require("./src/routes/addEmployeeRoutes");
const employeeShiftRoutes = require("./src/routes/employeeShiftRoutes");
const employeeAuthRoutes = require("./src/routes/employeeAuthRoutes");
const leaveRoutes = require("./src/routes/leaveRoutes");
const leaveTypeRoutes = require("./src/routes/leaveTypeRoutes");
const leaveBalanceRoutes = require("./src/routes/leaveBalanceRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const shiftRoutes = require("./src/routes/shiftRoutes");
const overtimeRoutes = require('./src/routes/overtimeRoutes');
const addProjectRoutes = require('./src/routes/addprojectroutes');
const estimateRoutes = require('./src/routes/estimateRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const projectFileRoutes = require('./src/routes/projectFileRoutes'); 
const chatRoutes = require('./src/routes/chatRoutes'); 

// ==============================
// Initialize App
// ==============================

const app = express();

// ==============================
// Connect Database
// ==============================

connectDB();

// ==============================
// CORS Configuration
// ==============================

const allowedOrigins = [
  "https://admin.prwebstock.com",
  "https://prwebstock.com",
  "https://www.prwebstock.com",
  "https://api.prwebstock.com",
  "https://admin.prwebstock.com",
  "https://manager.prwebstock.com",
  "https://employee.prwebstock.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log("Blocked Origin by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Requested-With",
  ],
};

app.use(cors(corsOptions));

// ==============================
// Body Parser (Set higher payload limits)
// ==============================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads"))
);

// ==============================
// API Routes
// ==============================

// Website APIs
app.use("/api/team-members", teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/industries", industryRoutes);
app.use("/api/gallery", galleryRoutes);

// CRM APIs
app.use("/api/employees", employeeRoutes);
app.use("/api/addemployees", addEmployeeRoutes);
app.use("/api/employee-shifts", employeeShiftRoutes);
app.use("/api/auth", employeeAuthRoutes);
app.use('/api/leaves', leaveRoutes);
app.use("/api/leave-types", leaveTypeRoutes);
app.use("/api/leave-balances", leaveBalanceRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use("/api/shifts", shiftRoutes);
app.use('/api/overtime', overtimeRoutes);
app.use('/api/addprojects', addProjectRoutes);
app.use("/api/estimates", estimateRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/project-files", projectFileRoutes);
app.use('/api/chat', chatRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 PR-WEBSTOCK Backend Running Successfully",
  });
});

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});


app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS policy restriction: Origin not permitted.",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});