const async = require('async');

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
function bookCreateGet (req, res) {
    res.send('Not Implemented: Book create GET');
}

// handle Book create on POST
function bookCreatePost (req, res) {
    res.send('Not Implemented: Book create POST');
}

// display Book delete form on GET
function bookDeleteGet (req, res) {
    res.send('Not Implemented: Book delete GET');
}

// handle Book delete on POST
function bookDeletePost (req, res) {
    res.send('Not Implemented: Book delete POST');
}

// display Book update form on GET
function bookUpdateGet (req, res) {
    res.send('Not Implemented: Book update GET');
}

// handle Book update on POST
function bookUpdatePost (req, res) {
    res.send('Not Implemented: Book update POST');
}

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