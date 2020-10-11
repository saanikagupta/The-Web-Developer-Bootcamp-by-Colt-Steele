// Reference: https://www.youtube.com/watch?v=9Qzmri1WaaE&list=LL&index=3&ab_channel=TraversyMedia

const express = require("express"),
      multer  = require("multer"),
      path    = require("path");

// Set Storage Engine
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 2000000}, // If uploaded file's size greater than 2x10^6 bytes, displays error
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single("myImage");

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|heic|application|octet-stream/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true); // Return null as the error
    }
    else{
        cb("Error: Images only!");
    }
}

// Init app
const app = express();

// EJS
app.set("view engine", "ejs");

// Public Folder
app.use(express.static("public"));

app.get("/", (req, res) => res.render("index"));

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render("index", {msg: err});
        }
        else{
            // console.log(req.file); // file information
            if(req.file == undefined){
                res.render("index", {
                    msg: "Error: No File Selected!"
                });
            }
            else{
                res.render("index", {
                    msg: "File Uploaded!",
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

const port = 3000;
app.listen(port, () => console.log(`Server started at Port ${port}!`));