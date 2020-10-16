// A shortcut for when multiple variable declarations
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      seedDB     = require("./seeds"),
      Comment    = require("./models/comment");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB(); // Every time the server starts, this file will first remove all the campgrounds, then create a bunch of campgrounds and comments in them

// Routes
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - add new campground to database
app.post("/campgrounds", function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc};
    
    // Create a new campground and save it to DB
    Campground.create(newCampground, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - shows more information about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    console.log("YelpCamp server has started!");
});