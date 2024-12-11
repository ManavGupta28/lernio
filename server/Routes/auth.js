const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("../models/User");

dotenv.config();

const router = express.Router();

/**
 * Route: POST /auth/signup
 * Description: Registers a new user
 * Request Body:
 *  - firstName, lastName, userBio, userEmail, userMobile, userName, userPassword
 */
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, userBio, userEmail, userMobile, userName, userPassword } = req.body;

    // Check if user already exists by email or mobile number
    const existingUser = await User.findOne({ 
      $or: [{ userEmail }, { userMobile }] 
    });
    if (existingUser) {
      return res.status(401).json({ error: "User already exists with this email or mobile number. Please log in." });
    }

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(userPassword, salt);

    // Create and save the new user
    const newUser = new User({
      firstName,
      lastName,
      userBio,
      userEmail,
      userMobile,
      userName,
      userPassword: encryptedPassword,
    });
    await newUser.save();

    // Respond with the user data excluding the password
    const { userPassword: _, ...userWithoutPassword } = newUser.toObject(); // Exclude password
    return res.status(200).json({
      status: "Ok",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


/**
 * Route: POST /auth/login
 * Description: Logs in a user
 * Request Body:
 *  - userEmail, userPassword
 */
router.post("/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Respond with the user data excluding the password
    const { userPassword: _, ...userWithoutPassword } = user.toObject();
    return res.status(200).json({
      status: "Ok",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
