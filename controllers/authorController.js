const Author = require('../models/author');

// display a list of all authors
function author_list (req, res) {
    res.send('Not Implemented: Author list');
}

// display detail page for a specific author
function author_detail (req, res) {
    res.send('Not Implemented: Author detail: ' + req.params.id);
}

// display Author create form on GET
function author_create_get (req, res) {
    res.send('Not Implemented: Author create GET');
}

// handle Author create on POST
function author_create_post (req, res) {
    res.send('Not Implemented: Author create POST');
}

// display Author delete form on GET
function author_delete_get (req, res) {
    res.send('Not Implemented: Author delete GET');
}

// handle Author delete on POST
function author_delete_post (req, res) {
    res.send('Not Implemented: Author delete POST');
}

// display Author update form on GET
function author_update_get (req, res) {
    res.send('Not Implemented: Author update GET');
}

// handle Author update on POST
function author_update_post (req, res) {
    res.send('Not Implemented: Author update POST');
}

module.exports = {
    author_list,
    author_detail,
    author_create_get,
    author_create_post,
    author_delete_get,
    author_delete_post,
    author_update_get,
    author_update_post
};