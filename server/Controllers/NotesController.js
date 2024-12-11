const express = require("express");
const dotenv = require("dotenv");
const Notes = require("../Models/Notes");
const multer = require("multer");
const path = require("path");

dotenv.config();

// Setup Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
const getAllCourses = async (req, res) => {
  try {
    const courses = await Notes.find();
    res.status(200).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadNote,
  getNote,
  getNoteByID,
  getAllCourses,
};
const uploadNote = async (req, res) => {
    try {
        const { title, description, tags, uploadedBy } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "File upload failed. No file provided." });
        }

        console.log("uploadedBy is:", uploadedBy);

        const newFile = new Notes({
            fileName: title,
            fileDescription: description,
            tags: tags,
            files: req.file.filename,
            uploadedBy: uploadedBy,
        });

        await newFile.save();
        return res.status(200).json({ message: "File uploaded successfully." });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getNote = async (req, res) => {
    try {
        const { title, tag } = req.query;
        const query = {};

        if (title) {
            query.fileName = { $regex: title, $options: "i" };
        }

        if (tag) {
            query.tags = { $regex: tag, $options: "i" };
        }

        const data = await Notes.find(query);
        return res.status(200).send({ data: data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getNoteByID = async (req, res) => {
    try {
        const userId = req.params.id;

        const data = await Notes.find({ uploadedBy: userId });
        return res.status(200).send({ data: data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadNote, getNote, getNoteByID };
