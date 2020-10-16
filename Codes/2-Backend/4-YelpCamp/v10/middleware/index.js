const Campground = require("../models/campground");
const Comment = require("../models/comment");

// All the middleware goes here
middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }  
            else{
                // Does user own the campground?
                // As foundCampground.author.id.equals is of type object, and req.user._id is of type string, hence using the Mongoose method .equals()
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } 
                else{
                    res.redirect("back");
                }
            }
        });
    } 
    else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }  
            else{
                // Does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } 
                else{
                    res.redirect("back");
                }
            }
        });
    } 
    else{
        res.redirect("back");
    }
}

module.exports = middlewareObj;