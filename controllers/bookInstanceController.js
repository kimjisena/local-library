const BookInstance = require('../models/bookInstance');

// display a list of all bookinstaces
function bookInstaceList (req, res) {
    res.send('Not Implemented: BookInstance list');
}

// display detail page for a specific bookinstance
function bookInstaceDetail (req, res) {
    res.send('Not Implemented: BookInstance detail: ' + req.params.id);
}

// display BookInstance create form on GET
function bookInstaceCreateGet (req, res) {
    res.send('Not Implemented: BookInstance create GET');
}

// handle BookInstance create on POST
function bookInstaceCreatePost (req, res) {
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
    bookInstaceList,
    bookInstaceDetail,
    bookInstaceCreateGet,
    bookInstaceCreatePost,
    bookInstanceDeleteGet,
    bookInstanceDeletePost,
    bookInstanceUpdateGet,
    bookInstanceUpdatePost
}