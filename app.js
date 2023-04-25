// 25-04-2023 Creating our own RESTFUL API
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded ({extended: true}));

// connect to mongoose
mongoose.connect("mongodb://localhost:2701/wikiDB", {useNewUrlParser: true});
// Create schema
const articlesSchema = {
    title: String,
    content: String
}
// Create the model
const Article = mongoose.model("Article", articlesSchema);





app.listen(3000, function(){
    console.log("Server started on port 3000");
});