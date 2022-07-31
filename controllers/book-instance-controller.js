const BookInstance = require('../models/book-instance');

// display a list of all bookinstaces
function bookInstanceList (req, res) {
    res.send('Not Implemented: BookInstance list');
}

// display detail page for a specific bookinstance
function bookInstanceDetail (req, res) {
    res.send('Not Implemented: BookInstance detail: ' + req.params.id);
}

// display BookInstance create form on GET
function bookInstanceCreateGet (req, res) {
    res.send('Not Implemented: BookInstance create GET');
}

// handle BookInstance create on POST
function bookInstanceCreatePost (req, res) {
    res.send('Not Implemented: BookInstance create POST');
}

// display BookInstance delete form on GET
function bookInstanceDeleteGet (req, res) {
    res.send('Not Implemented: BookInstance delete GET');
}

// handle BookInstance delete on POST
function bookInstanceDeletePost (req, res) {
    res.send('Not Implemented: BookInstance delete POST');
}

// display BookInstance update form on GET
function bookInstanceUpdateGet (req, res) {
    res.send('Not Implemented: BookInstance update GET');
}

// handle BookInstance update on POST
function bookInstanceUpdatePost (req, res) {
    res.send('Not Implemented: BookInstance update POST');
}


module.exports = {
    bookInstanceList,
    bookInstanceDetail,
    bookInstanceCreateGet,
    bookInstanceCreatePost,
    bookInstanceDeleteGet,
    bookInstanceDeletePost,
    bookInstanceUpdateGet,
    bookInstanceUpdatePost
}