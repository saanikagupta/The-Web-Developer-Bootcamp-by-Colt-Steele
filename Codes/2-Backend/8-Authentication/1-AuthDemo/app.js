const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      User                  = require("./models/user"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Justin Bieber is the best!", // This secret will be used to encode and decode sessions
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// This authenticate, serializing and deserializing methods come with passport-local-mongoose
// We have used its plugin in user.js hence we can use these methods on the model User
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==========
// ROUTES
//==========

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// Auth Routes

// Show sign-up form
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    
    // We are not storing the password to the database right away
    // password will be hashed automatically because of the register method we used below
    // The hashed password and seed will be stored in the database along with the username
    // Check the users collection in auth_demo_app DB
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }

        // Logs the user in, takes care everything in session, stores the correct information, runs the serialize method
        // serializeUser determines which data of the user object should be stored in the session
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

// Login Routes

// Render Login form
app.get("/login", function(req, res){
    res.render("login");
});

// Login logic
// middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
})); // I did not put the callback as it doesn't really do anything

app.get("/logout", function(req, res){
    // passport will destroy all the user data in the session
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next(); // runs next which is the callback function here
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("Server is running!");
});