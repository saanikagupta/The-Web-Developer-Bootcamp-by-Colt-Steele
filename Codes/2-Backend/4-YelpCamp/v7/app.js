const campground = require("./models/campground");

// A shortcut for when multiple variable declarations
const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      passport      = require("passport");
      LocalStrategy = require("passport-local");
      Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      User          = require("./models/user");
      seedDB        = require("./seeds");

// Requiring Routes
const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again, Justin wins!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware
// So that we don't have write code again and again to send the information of logged in users for each template
app.use(function(req, res, next){
    res.locals.currentUser = req.user; // Whatever we put inside res.locals will be available inside our templates
    next(); // To move on to the next middleware which will be the route handler (callback function) in most of the cases
});

// ROUTE DECLARATIONS
// These prefixes will be added in front of all the routes in those files
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("YelpCamp server has started!");
});