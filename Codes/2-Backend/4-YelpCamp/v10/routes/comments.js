const express = require("express");

// Passing this object will merge the params from campground and comments together
// This is required so that we can access :id in this file where we evaluated req.params.id
const router = express.Router({mergeParams: true}); // We will add all the routes in router instead of app
const Campground = require("../models/campground"); // Works fine without it
const Comment = require("../models/comment"); // Works fine without it as it is already required in app.js
const middleware = require("../middleware");

// Comments NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect(back);
        }
        else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }
        else{
            // We could have used back here to go back to the campground show page. But someone can make request from POSTMAN, hence we need to be specific
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;