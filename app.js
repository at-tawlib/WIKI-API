// 25-04-2023 Creating our own RESTFUL API
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded ({extended: true}));
app.use(express.static("public"));

// connect to mongoose
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});
// Create schema
const articlesSchema = {
    title: String,
    content: String
};
// Create the model
const Article = mongoose.model("Article", articlesSchema);

// method to get all articles
app.get("/articles", function(req, res) {
    Article.find().then(function(docs) {
        if (docs) {
            res.send(docs);
        }
    });
});


// method to post article
app.post("/articles", function(req, res) {
    //console.log(req.body.title);
    //console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save().then(function(doc) {
        res.send("Successfully added a new article.");
    });
});

// method to delete all articles
app.delete("/articles", function(req, res) {
    Article.deleteMany().then(function(docs){
        res.send("Successfully deleted all articles.");
    });
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});