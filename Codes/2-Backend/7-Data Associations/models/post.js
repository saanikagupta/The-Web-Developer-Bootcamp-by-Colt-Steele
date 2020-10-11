const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// POST - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// This returns the model Post when we require this file
module.exports = mongoose.model("Post", postSchema);