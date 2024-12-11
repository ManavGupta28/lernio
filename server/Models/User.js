const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,  // Trim whitespace for clean data
        minlength: 2,  // Ensure first names are at least two characters long
        maxlength: 50,  // Cap first name length to prevent excessively long values
    },
    lastName: {
        type: String,
        required: true,
        trim: true,  // Trim whitespace for clean data
        minlength: 2,  // Ensure last names are at least two characters long
        maxlength: 50,  // Cap last name length to prevent excessively long values
    },
    userBio: {
        type: String,
        required: true,
        trim: true,  // Trim whitespace for clean data
        maxlength: 300,  // Cap user bio length to prevent excessively long values
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,  // Ensure email uniqueness
        lowercase: true,  // Convert email to lowercase to maintain consistency
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please use a valid email address.'],  // Validate email format
    },
    userMobile: {
        type: Number,
        required: true,
        unique: true,  // Ensure mobile number uniqueness
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number.'],  // Validate 10-digit mobile number
    },
    userName: {
        type: String,
        required: true,
        unique: true,  // Ensure username uniqueness
        trim: true,  // Trim whitespace for clean data
        minlength: 3,  // Ensure usernames are at least three characters long
        maxlength: 30,  // Cap username length to prevent excessively long values
    },
    userPassword: {
        type: String,
        required: true,
        minlength: 6,  // Minimum length for security reasons
        maxlength: 100,  // Cap password length to prevent excessively long values
        trim: true,  // Trim whitespace for clean data
        // Consider using a hashing algorithm like bcrypt before saving the password to the database
    },
}, {
    timestamps: true,  // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model("User", userSchema);
