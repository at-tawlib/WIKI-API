// 25-04-2023 Creating our own RESTFUL API
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// connect to mongoose
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });
// Create schema
const articlesSchema = {
    title: String,
    content: String
};
// Create the model
const Article = mongoose.model("Article", articlesSchema);

// combine same routes
app.route("/articles")
    .get(function (req, res) {
        // method to get all articles
        Article.find().then(function (docs) {
            if (docs) {
                res.send(docs);
            }
        });
    })
    .post(function (req, res) {
        // method to post an article
        //console.log(req.body.title);
        //console.log(req.body.content);
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save().then(function (doc) {
            res.send("Successfully added a new article.");
        });
    })
    .delete(function (req, res) {
        // method to delete all articles
        Article.deleteMany().then(function (docs) {
            res.send("Successfully deleted all articles.");
        });
    });

//////////////////// REQUESTS TARGETTING A SPECIFIC ARTICLE ///////////////////////////
app.route("/articles/:articleTitle")
    .get(function (req, res) {
        // method to get single article
        Article.findOne({title: req.params.articleTitle}).then(function(doc){
            if(doc != null) {
                res.send(doc);
            } else {
                res.send("No articles matching that title was found.");
            }
        });
    })
    .put(function(req, res) {
        // method to put article
        // put replaces the value
        Article.updateOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content}
        ).then(function(doc) {
            if (doc != null){
                res.send("Successfully Updated article.");
            }else {
                res.send("Update failed");
            }
        });
    })
    .patch(function(req, res) {
        Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body}
        ).then(function(doc){
            if(doc != null) {
                res.send("Successfully updated article.");
            } else {
                res.send("Unable to update article.");
            }
        })
    })
    .delete(function(req, res){
        Article.deleteOne({title: req.params.articleTitle}).then(function(doc) {
            res.send("Successfully deleted the corresponding article.");
        });
    });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});