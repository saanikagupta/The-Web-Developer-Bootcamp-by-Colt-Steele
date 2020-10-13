const mongoose = require("mongoose");

// POST - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// This returns the model Post when we require this file
module.exports = mongoose.model("Post", postSchema);