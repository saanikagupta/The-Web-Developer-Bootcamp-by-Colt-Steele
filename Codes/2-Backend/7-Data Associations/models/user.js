const mongoose = require("mongoose");

// USER - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, // References to the id of posts instead of embedding all the posts
            ref: "Post"
        }
    ]
});

// This returns the model User when we require this file
module.exports = mongoose.model("User", userSchema);