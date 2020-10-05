const express = require("express");
const app = express();

// 3 routes
// Root path or "/" -> "Hi there!"
// req and res are objects here
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" -> "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

// "/dog" -> "Meow!"
app.get("/dog", function(req, res){
    res.send("Meow!");
    console.log("Someone has made a get request to /dog!"); // This message will appear in terminal
});

// Route params
// http://localhost:3000/r/d will work
// http://localhost:3000/r/soccer will work
// http://localhost:3000/r/soccer/play will not work as this is a different pattern
app.get("/r/:subredditName", function(req, res){
    console.log(req.params);
    res.send("Welcome to Subreddit!");
});

// http://localhost:3000/r/soccer/comments/123/my_first_soccer_game will work
// http://localhost:3000/r/soccer/comments/id123/my_first_soccer_game will work
// http://localhost:3000/r/soccer/comments/soc/my_first_soccer_game will work
app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    const subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT");
});

// When the route doesn't exist
// * catches all the routes
// It should be at the end of all the routes like it is here, because order of routes matters!
app.get("*", function(req, res){
    res.send("You are a star!");
});

// Tell Express to listen for requests (start server!)
app.listen(3000, function(){
    console.log("Server started at Port 3000!");
});