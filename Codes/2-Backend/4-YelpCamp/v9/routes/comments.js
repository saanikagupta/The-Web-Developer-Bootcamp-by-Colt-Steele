const express = require("express");

// Passing this object will merge the params from campground and comments together
// This is required so that we can access :id in this file where we evaluated req.params.id
const router = express.Router({mergeParams: true}); // We will add all the routes in router instead of app
const Campground = require("../models/campground"); // Works fine without it
const Comment = require("../models/comment"); // Works fine without it as it is already required in app.js

// Comments NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments CREATE ROUTE
// We need to put the isLoggedIn middleware here as well as otherwise someone can make a post request using postman and the comment will be added
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;