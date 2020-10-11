const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

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