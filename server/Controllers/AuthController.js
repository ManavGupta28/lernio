const express = require("express");
const dotenv = require("dotenv");
import User from "../models/User";
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary");

dotenv.config();

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Signup Route
const signup = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userEmail, userMobile, userName, userPassword, profileImage } = req.body;

        // Validation
        if (!firstName || !lastName || !userBio || !userEmail || !userMobile || !userName || !userPassword) {
            return res.status(400).send("All fields are required.");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ userEmail }, { userMobile }] 
        });

        if (existingUser) {
            return res.status(409).send("User already exists with this email or username. Please log in.");
        }

        // Hash the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(userPassword, salt);

        // Upload profile image to Cloudinary if it exists
        let profileImageUrl;
        if (profileImage) {
            const result = await cloudinary.uploader.upload(profileImage, { resource_type: "auto" });
            profileImageUrl = result.secure_url;
        }

        // Create and save new user
        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: profileImageUrl,
        });

        await newUser.save();

        return res.status(201).json({
            status: "Success",
            user: newUser
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "An unexpected error occurred.",
            error: error.message,
        });
    }
};

// Login Route
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // Validation
        if (!userEmail || !userPassword) {
            return res.status(400).send("Email and password are required.");
        }

        const user = await User.findOne({ userEmail });

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User does not exist. Please sign up first.",
            });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

        if (!passwordMatch) {
            return res.status(401).json({
                status: "Error",
                message: "Incorrect email or password.",
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Login successful.",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "An unexpected error occurred.",
            error: error.message,
        });
    }
};

module.exports = { signup, login };
