const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

// Heroku dynos expose a dynamic port for your app to bind to. This value is exposed in the $PORT env var
// This will use the $PORT env var if available, or fallback to a default port (useful for local development)
app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started");
});