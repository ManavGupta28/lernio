const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./Routes/auth");
const noteRoutes = require("./Routes/notes");

const app = express();
const PORT = process.env.PORT || 6969;

dotenv.config();

// Enable CORS
app.use(cors());

// Use body parser to parse JSON payloads
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit process if connection fails
  }
};

// Route Handlers
app.get("/", (req, res) => {
  res.send("Server Is Running");
});

app.post('/api/endpoint', (req, res) => {
  console.log("Request received!");
  res.json({ message: "Data received" });
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/files", express.static("files"));

// Start the server after the DB is connected
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
  });
});
