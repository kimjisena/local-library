const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');
const { body, validationResult } = require("express-validator");

// display a list of all genres
function genreList (req, res, next) {
    Genre.find()
        .sort({name: 1})
        .exec(function (err, genreList) {
            if (err) {
                return next(err);
            }
            res.render('genre-list', { title: 'Genre List', genreList });
        });
}

// display detail page for a specific genre
function genreDetail (req, res, next) {
    async.parallel({
        genre(callback) {
            Genre.findById(req.params.id)
              .exec(callback);
        },

        genreBooks(callback) {
            Book.find({ 'genre': req.params.id })
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { 
            return next(err); 
        }
        if (results.genre === null) { // No results.
            const err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('genre-detail', {
          title: 'Genre Detail',
          genre: results.genre,
          genreBooks: results.genreBooks,
        });
    });
}

// display Genre create form on GET
function genreCreateGet (req, res, next) {
    res.render("genre-form", { title: "Create Genre" });
}

// handle Genre create on POST
const genreCreatePost = [
    // validate and sanitize the name field
    body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
  
    // process request after validation and sanitization
    (req, res, next) => {
      // extract the validation errors from a request
      const errors = validationResult(req);
  
      // create a genre object with escaped and trimmed data
      const genre = new Genre({ name: req.body.name });
  
      if (!errors.isEmpty()) {
        // there are errors, render the form again with sanitized values/error messages
        res.render("genre-form", {
          title: "Create Genre",
          genre,
          errors: errors.array(),
        });
        return;
      } else {
        // data from form is valid
        // check if Genre with same name already exists
        Genre.findOne({ name: req.body.name }).exec((err, foundGenre) => {
          if (err) {
            return next(err);
          }
  
          if (foundGenre) {
            // Genre exists, redirect to its detail page
            res.redirect(foundGenre.url);
          } else {
            genre.save((err) => {
              if (err) {
                return next(err);
              }
              // Genre saved. Redirect to genre detail page
              res.redirect(genre.url);
            });
          }
        });
      }
    },
  ];

// display Genre delete form on GET
function genreDeleteGet (req, res) {
    res.send('Not Implemented: Genre delete GET');
}

// handle Genre delete on POST
function genreDeletePost (req, res) {
    res.send('Not Implemented: Genre delete POST');
}

// display Genre update form on GET
function genreUpdateGet (req, res) {
    res.send('Not Implemented: Genre update GET');
}

// handle Genre update on POST
function genreUpdatePost (req, res) {
    res.send('Not Implemented: Genre update POST');
}

module.exports = {
    genreList,
    genreDetail,
    genreCreateGet,
    genreCreatePost,
    genreDeleteGet,
    genreDeletePost,
    genreUpdateGet,
    genreUpdatePost
};