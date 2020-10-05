const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to solutions!");
});

app.get("/speak/:animal", function(req, res){
    const sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate you human",
        goldfish: "..."
    }
    const animal = req.params.animal.toLowerCase();
    res.send("The " + animal + " says '" + sounds[animal] + "'");
});

app.get("/repeat/:message/:times", function(req, res){
    const message = req.params.message;
    const times = Number(req.params.times);
    let result = ""
    for(let i = 0; i < times; i++){
        result += message + " "
    }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, function(){
    console.log("Server started at Port 3000!");
});