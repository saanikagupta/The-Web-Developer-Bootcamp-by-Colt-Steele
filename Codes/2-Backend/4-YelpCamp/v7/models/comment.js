const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

const commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);
