const Campground = require("../models/campground");
const Comment = require("../models/comment");

// All the middleware goes here
middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found.");
                res.redirect("back");
            }  
            else{
                // Does user own the campground?
                // As foundCampground.author.id.equals is of type object, and req.user._id is of type string, hence using the Mongoose method .equals()
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } 
                else{
                    req.flash("You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } 
    else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found.");
                res.redirect("back");
            }
            else{
                // Does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } 
                else{
                    req.flash("error", "You need to be logged in to do that.");
                    res.redirect("back");
                }
            }
        });
    } 
    else{
        req.flash("error", "You don't have permission to do that.");
        res.redirect("back");
    }
}

module.exports = middlewareObj;