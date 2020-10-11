// NOTE: This code may throw errors due to asynchronous behaviour of Node.js and Mongoose
// Refer this code for corrections: https://www.udemy.com/course/the-web-developer-bootcamp/learn/#questions/4062356
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {
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
const Post = mongoose.model("Post", postSchema);

// USER - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] // An array of posts
});
const User = mongoose.model("User", userSchema);

var newUser = new User({
    email: "hermione@hogwarts.edu",
    name: "Hermione Granger"
});

newUser.posts.push({
    title: "How to bre polyjuice potion",
    content: "Just kidding.  Go to potions class to learn it!"
});

// Save after pushing
newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});

User.findOne({name: "Hermione Granger"}, function(err, user){
    if(err){
        console.log(err);
    } 
    else {
        console.log(user); // If this is null (due to the asynchronous behaviour), the code will throw an error!
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort.  Voldemort. Voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});

