const async = require('async');
const { body, validationResult } = require('express-validator');

const Book = require('../models/book');
const BookInstance = require('../models/book-instance');
const Genre = require('../models/genre');
const Author = require('../models/author');

function index (req, res) {
    async.parallel({
        bookCount(callback) {
            Book.countDocuments({}, callback);
        },
        bookInstanceCount(callback) {
            BookInstance.countDocuments({}, callback);
        },
        bookInstanceAvailableCount(callback) {
            BookInstance.countDocuments({status: 'Available'}, callback);
        },
        authorCount(callback) {
            Author.countDocuments({}, callback);
        },
        genreCount(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
}

// display a list of all books
function bookList (req, res, next) {

    Book.find({}, 'title author')
        .sort({title : 1})
        .populate('author')
        .exec(function (err, bookList) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('book-list', { title: 'Book List', bookList });
        });
}

// display detail page for a specific book
function bookDetail (req, res, next) {
    
    async.parallel({
        book(callback) {

            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        bookInstance(callback) {

          BookInstance.find({ 'book': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { 
            return next(err); 
        }
        if (results.book === null) { // No results.
            const err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book-detail', {
          title: results.book.title,
          book: results.book,
          bookInstances: results.bookInstance,
        });
    });
}

// display Book create form on GET
function bookCreateGet (req, res, next) {
    // get all authors and genres, which we can use for adding to our book
    async.parallel({
        authors(callback) {
            Author.find(callback);
        },
        genres(callback) {
            Genre.find(callback);
        },
    }, function(err, results) {
        if (err) { 
            return next(err); 
        }
        res.render('book-form', { title: 'Create Book', authors: results.authors, genres: results.genres });
    });
}

// handle Book create on POST
const bookCreatePost = [
    // convert the genre to an array
    (req, res, next) => {
        if(!(Array.isArray(req.body.genre))){
            if(typeof req.body.genre === 'undefined') {
                req.body.genre = [];
            } else {
                req.body.genre = [req.body.genre];
            }
        }
        next();
    },

    // validate and sanitize fields
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),

    // process request after validation and sanitization
    (req, res, next) => {

        // extract the validation errors from a request
        const errors = validationResult(req);

        // create a Book object with escaped and trimmed data.
        const book = new Book({ 
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
           });

        if (!errors.isEmpty()) {
            // there are errors, render form again with sanitized values/error messages

            // get all authors and genres for form
            async.parallel({
                authors(callback) {
                    Author.find(callback);
                },
                genres(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { 
                    return next(err); 
                }

                // mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked = 'true';
                    }
                }
                res.render('book-form', { title: 'Create Book', authors: results.authors, genres: results.genres, book, errors: errors.array() });
            });
            return;
        }
        else {
            // data from form is valid
            book.save(function (err) {
                if (err) { 
                    return next(err); 
                }
                   // successful - redirect to new book record
                   res.redirect(book.url);
                });
        }
    }
];

// display Book delete form on GET
function bookDeleteGet (req, res, next) {
    
    async.parallel({
        book(callback) {
            Book.findById(req.params.id).exec(callback);
        },
        bookInstances(callback) {
            BookInstance.find({ 'book': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { 
            return next(err); 
        }
        if (results.book === null) { // no results
            res.redirect('/catalog/books');
        }

        // successful, so render
        res.render('book-delete', { title: 'Delete Book', book: results.book, bookInstances: results.bookInstances });
    });

}

// handle Book delete on POST
function bookDeletePost (req, res) {
    
    async.parallel({
        book(callback) {
            Book.findById(req.params.id).exec(callback);
        },
        bookInstances(callback) {
            BookInstance.find({ 'book': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { 
            return next(err); 
        }
        // success
        if (results.bookInstances.length > 0) {
            // book has copies, render in same way as for GET route
            res.render('book-delete', { title: 'Delete Book', book: results.book, bookInstances: results.bookInstances });
            return;
        }
        else {
            // book has no copies, delete object and redirect to the list of books
            Book.findByIdAndRemove(req.body.bookId, function deleteBook(err) {
                if (err) { 
                    return next(err); 
                }
                // success - go to author list
                res.redirect('/catalog/books');
            });
        }
    });
}

// display Book update form on GET
function bookUpdateGet (req, res) {

    // get book, authors and genres for form.
    async.parallel({
        book(callback) {
            Book
                .findById(req.params.id)
                .populate('author')
                .populate('genre')
                .exec(callback);
            },
        authors(callback) {
            Author
                .find(callback);
            }, 
        genres(callback) {
            Genre
                .find(callback);
            },
        }, function(err, results) {
            if (err) { 
                return next(err); 
            }
            if (results.book === null) { // no results
                const err = new Error('Book not found');
                err.status = 404;
                return next(err);
            }
            // success
            // mark our selected genres as checked
            for (let all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
                for (let book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
                    if (results.genres[all_g_iter]._id.toString() === results.book.genre[book_g_iter]._id.toString()) {
                        results.genres[all_g_iter].checked = 'true';
                    }
                }
            }
            res.render('book-form', { title: 'Update Book', authors: results.authors, genres: results.genres, book: results.book });
        });
}

// handle Book update on POST
const bookUpdatePost = [

    // convert the genre to an array
    (req, res, next) => {
        if (!(Array.isArray(req.body.genre))){
            if (typeof req.body.genre === 'undefined') {
                req.body.genre = [];
            } else {
                req.body.genre= [req.body.genre];
            }
            
        }
        next();
    },

    // validate and sanitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),

    // process request after validation and sanitization
    (req, res, next) => {

        // extract the validation errors from a request.
        const errors = validationResult(req);

        // create a book object with escaped/trimmed data and old id
        const book = new Book(
          { title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre,
            _id: req.params.id // this is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // there are errors - render form again with sanitized values/error messages

            // get all authors and genres for form
            async.parallel({
                authors(callback) {
                    Author.find(callback);
                },
                genres(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { 
                    return next(err);
                }

                // mark our selected genres as checked
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked = 'true';
                    }
                }
                res.render('book-form', { title: 'Update Book', authors: results.authors, genres: results.genres, book, errors: errors.array() });
            });
            return;
        } else {
            // data from form is valid - update the record
            Book.findByIdAndUpdate(req.params.id, book, {}, function (err, thebook) {
                if (err) { 
                    return next(err); 
                }
                   // successful - redirect to book detail page
                   res.redirect(thebook.url);
            });
        }
    }
];

module.exports = {
    index,
    bookList,
    bookDetail,
    bookCreateGet,
    bookCreatePost,
    bookDeleteGet,
    bookDeletePost,
    bookUpdateGet,
    bookUpdatePost
};