const bodyParser = require("body-parser"),
mongoose         = require("mongoose"),
express          = require("express"),
app              = express();

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now} // Setting a default date
});
const Blog = mongoose.model("Blog", blogSchema)

// Blog.create({
//     title: "Test Blog",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGMf5RLsxY1VKguLz-6s6bhYUkC3xWrAmG3Q&usqp=CAU",
//     body: "Hello, this is a blog post!"
// });

// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error!");
        }
        else{
            res.render("index", {blogs: blogs});
        }
    })
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            // Notice we are redirecting instead of printing the error
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

app.listen(3000, function(){
    console.log("Server is running!");
});