const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
const friends = [  
    "Gazal", "Gargi", "Avani", 
    "Rashi", "Mahima", "Shambhavi", 
    "Yukta", "Charchit", "Anurag", "Pratik"
];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
    const newfriend = req.body.newfriend;
    friends.push(newfriend);
    res.redirect("/friends");
});

app.listen(3000, function(){
    console.log("Server started at Port 3000!");
});