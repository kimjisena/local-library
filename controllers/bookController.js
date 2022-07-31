const Book = require('../models/book');

function index (req, res) {
    res.send('Not Implemented: Site Home Page');
}

// display a list of all books
function bookList (req, res) {
    res.send('Not Implemented: Book list');
}

// display detail page for a specific book
function bookDetail (req, res) {
    res.send('Not Implemented: Book detail: ' + req.params.id);
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