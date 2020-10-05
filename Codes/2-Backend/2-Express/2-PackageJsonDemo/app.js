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

// Tell Express to listen for requests (start server!)
app.listen(3000, function(){
    console.log("Server started at Port 3000!");
});