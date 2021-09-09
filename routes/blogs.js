var express = require('express');
var router = express.Router();
var expressSanitizer = require("express-sanitizer");

//requiring models
var Blog = require("../models/blog");


//INDEX
router.get("/", function (req, res) {
    Blog.find({}, function (err, allBlogs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { blogs: allBlogs });
        }
    });
});

//NEW 
router.get("/new", function (req, res) {
    res.render("new");
});

//CREATE 
router.post("", function (req, res) {

    //sanitize the body 
    req.body.blog.body = req.sanitize(req.body.blog.body);
   
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            console.log(err);
        }
        else {
            //redirect to blogs page
            res.redirect("/blogs");
        }
    });

});

//SHOW
router.get("/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", { blog: foundBlog });
        }
    });

});

//EDIT 
router.get("/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("edit", { blog: foundBlog });
        }
    });

});

//UPDATE
router.put("/:id", function (req, res) {

    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE
router.delete("/:id", function (req, res) {

    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/blogs");
        }
    });
});


module.exports = router;