const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');


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
function genreCreateGet (req, res) {
    res.send('Not Implemented: Genre create GET');
}

// handle Genre create on POST
function genreCreatePost (req, res) {
    res.send('Not Implemented: Genre create POST');
}

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