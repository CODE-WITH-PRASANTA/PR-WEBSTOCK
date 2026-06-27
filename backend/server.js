require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./src/config/db");

// Routes
const teamRoutes = require("./src/routes/teamRoutes");

const projectRoutes = require(
  "./src/routes/projectRoutes"
);


const careerRoutes =
  require("./src/routes/careerRoutes");

  const blogRoutes = require("./src/routes/blogRoutes");

  const industryRoutes = require("./src/routes/industryRoutes");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Upload Folder
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
// Routes
app.use("/api/team-members", teamRoutes);


app.use(
  "/api/careers",
  careerRoutes
);

app.use("/api/blogs", blogRoutes);

app.use( "/api/projects", projectRoutes );

app.use("/api/industries", industryRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server Running on Port ${PORT}`
  );
});