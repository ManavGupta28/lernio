const express = require("express");
const router = express.Router();
const NotesController = require("../Controllers/NotesController");
const multer = require("multer");

// Configure storage for multer
const storage = multer.diskStorage({
    destination: "./files",
    filename: (req, file, cb) => {
        // Generate a unique filename using the current timestamp and original filename
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Route for uploading files
router.post("/upload", upload.single("file"), NotesController.uploadNote);

// Route for retrieving all files
router.get("/getFiles", NotesController.getNote);

// Route for retrieving a file by its ID
router.get("/getFiles/:id", NotesController.getNoteByID);
// In your notes route (e.g., `routes/notes.js`):
router.get("/all", NotesController.getAllCourses);

module.exports = router;
