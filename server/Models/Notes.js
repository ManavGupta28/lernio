const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        trim: true,  // Trim whitespace for clean data
        minlength: 3,  // Ensure file names are sufficiently descriptive
        maxlength: 100,  // Cap file name length to prevent excessively long values
    },
    fileDescription: {
        type: String,
        required: true,
        trim: true,  // Trim whitespace for clean data
        minlength: 5,  // Ensure descriptions are sufficiently detailed
        maxlength: 500,  // Cap description length to prevent excessively long values
    },
    tags: {
        type: String,
        required: true,
        trim: true,  // Trim whitespace for clean data
        minlength: 1,  // Tags should be at least one character long
        maxlength: 50,  // Cap tag length to prevent excessively long values
    },
    files: {
        type: String,
        required: true,
        trim: true,  // Trim whitespace for clean data
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,  // Add an index for efficient lookups based on user ID
    },
}, {
    timestamps: true,  // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model("Notes", NoteSchema);
