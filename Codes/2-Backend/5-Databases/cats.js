const mongoose = require("mongoose");

// cat_app is the name of the database. 
// If it doesn't exist, it will be created. 
// Otherwise the pre-existing cat_app database will be used.
mongoose.connect("mongodb://localhost:27017/cat_app", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// Doesn't do anything to the database. 
// Just tells Mongoose, JS that I want to be able to add cats to our database and a cat is defined like this.
// So this is defining a pattern for our data.
const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temprament: String
});

// Compiling the catSchema into a model so that we can methods on it.
// A collection called cats (it pluralizes the model name for us) is made in cat_app database.
// It's conventional to have the first letter of model uppercase.
const Cat = mongoose.model("Cat", catSchema);

// Adding a new cat to the DB
const george = new Cat({
    name: "George",
    age: 11,
    temprament: "Grouchy"
});

// Might not necessarily be saved by this, hence passing the callback function.
// This function will be executed after saving process is done.
george.save(function(err, cat){
    if(err){
        console.log("Something went wrong!");
    }
    else{
        console.log("We just saved a cat to the database");
        console.log(cat);
    }
});

// A shorter way of adding a cat in the DB.
Cat.create({
    name: "Snow White",
    age: 15,
    temprament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    }
    else{
        console.log(cat);
    }
});

// Retrieving all cats from the DB and console.log() them.
// Passing an empty object because we are not looking for any specific cats.
Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh no, error!");
    }
    else{
        console.log("All the cats...");
        console.log(cats);
    }
});