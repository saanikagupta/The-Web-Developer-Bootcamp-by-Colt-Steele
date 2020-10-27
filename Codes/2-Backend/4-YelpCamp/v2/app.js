// A shortcut for when multiple variable declarations
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose");


mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema setup (We will definitely refactor it)
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Model
const Campground = mongoose.model("Campground", campgroundSchema);

// // Adding data to DB
// // Comment it when running again as otherwise it will again add the same data on running this file
// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//         description: "This is a huge granite hill, no bathrooms, no water. Beautiful granite!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Newly created campground: ");
//             console.log(campground);
//         }
//     }
// )

// Campground.create(
//     {
//         name: "Salmon Creek",
//         image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Newly created campground: ");
//             console.log(campground);
//         }
//     }
// )

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
    Campground.findById(req.params.id, function(err, foundCampground){
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