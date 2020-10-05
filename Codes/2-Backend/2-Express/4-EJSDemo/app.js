const express = require("express");
const app = express();

// Serve the directory named public
app.use(express.static("public"));

// It would expect all templates to be ejs and so we can remove .ejs from files inside res.render()
app.set("view engine", "ejs");

app.get("/", function(req, res){
    // res.send("<h1>Hi there!</h1><h2>I am a dog person!</h2>");
    res.render("home");
});

app.get("/justin/song/:songname", function(req, res){
    const song = req.params.songname;
    res.render("song", {songName: song});
});

app.get("/songs", function(req, res){
    const songs = [
        {title: "Baby", singer: "Justin Bieber"},
        {title: "Love Story", singer: "Taylor Swift"},
        {title: "Lose You To Love Me", singer: "Selena Gomez"},
        {title: "Roar", singer: "Katy Perry"}
    ];
    res.render("songlist", {songs: songs});
});

app.listen(3000, function(){
    console.log("Server started at Port 3000!");
});