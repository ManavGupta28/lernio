const express = require("express");
const dotenv = require("dotenv");
import User from "../models/User";
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary");

dotenv.config();
 
const router = express.Router();

const storage = multer.memoryStorage();
var upload = multer({
    storage: storage
});

const signup = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userEmail, userMobile, userName } = req.body;
        const existingUser = await User.findOne({ 
            $or: [{ userEmail }, { userMobile }] 
        });

        if (existingUser) {
            return res.status(401).send("User already exists with this email or username. Please log in.");
        }
        const password = req.body.userPassword;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(password, salt);
        console.log("Request Body: ", req.body);
        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url
        });
        await newUser.save();

        return res.status(200).json({
            status: "Ok",
            user: newUser
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};


const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail });

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User does not exist. Please sign up first.",
            });
        }
        

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