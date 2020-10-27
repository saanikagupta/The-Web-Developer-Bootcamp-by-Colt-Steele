// A shortcut for when multiple variable declarations
const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      flash          = require("connect-flash"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override"),
      User           = require("./models/user");

// Requiring Routes
const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");

const dbUrl = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";

mongoose.connect(dbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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
app.use(function(req, res, next){
    res.locals.currentUser = req.user; // Whatever we put inside res.locals will be available inside our templates
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); // To move on to the next middleware which will be the route handler (callback function) in most of the cases
});

// ROUTE DECLARATIONS
// These prefixes will be added in front of all the routes in those files
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Serving on port ${port}`);
});


