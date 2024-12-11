const express = require("express");
const dotenv = require("dotenv");
const Notes = require("../Models/Notes");
const multer = require("multer");
const path = require("path");

dotenv.config();

const storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const uploadNote = async (req, res) => {
    try {
      const { title, description, tags, uploadedBy } = req.body;
      if (!req.file) {
        return res.status(400).json({ error: "File upload failed" });
      }
      console.log("uploadedBy is. ",uploadedBy);
      const newFile = new Notes({
        fileName: title,
        fileDescription: description,
        tags: tags,
        files: req.file.filename,
        uploadedBy: uploadedBy,
      });
  
      await newFile.save();
      res.status(200).json({ message: "File uploaded successfully." });
    } catch (error) {
      res.status(400).json({ error: error.message });
      error;
    }
  };


const getNote = async (req, res) => {
  try {
    const { title, tag } = req.query;
    const query = {};

    if (title) {
      query.fileName = {
        $regex: title,
        $options: "i",
      };
    }

    if (tag) {
      query.tags = {
        $regex: tag,
        $options: "i",
      };
    }

    const data = await Notes.find(query);
    res.send({ data: data });
  } catch (error) {
    error;
  }
};

const getNoteByID = async (req, res) => {
  try {
    const userId = req.params.id;
    userId;

    await Notes.find({
      uploadedBy: userId,
    }).then((data) => {
      res.send({ data: data });
    });
  } catch (error) {
    error;
  }
};

module.exports = { uploadNote, getNote, getNoteByID };