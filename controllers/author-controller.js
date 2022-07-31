const Author = require('../models/author');

// display a list of all authors
function authorList (req, res) {
    Author.find()
        .sort([['familyName', 'ascending']])
        .exec(function (err, authorList) {
            if (err) { return next(err); }
            // successful, so render
            res.render('author-list', { title: 'Author List', authorList });
    });
}

// display detail page for a specific author
function authorDetail (req, res) {
    res.send('Not Implemented: Author detail: ' + req.params.id);
}

// display Author create form on GET
function authorCreateGet (req, res) {
    res.send('Not Implemented: Author create GET');
}

// handle Author create on POST
function authorCreatePost (req, res) {
    res.send('Not Implemented: Author create POST');
}

// display Author delete form on GET
function authorDeleteGet (req, res) {
    res.send('Not Implemented: Author delete GET');
}

// handle Author delete on POST
function authorDeletePost (req, res) {
    res.send('Not Implemented: Author delete POST');
}

// display Author update form on GET
function authorUpdateGet (req, res) {
    res.send('Not Implemented: Author update GET');
}

// handle Author update on POST
function authorUpdatePost (req, res) {
    res.send('Not Implemented: Author update POST');
}

module.exports = {
    authorList,
    authorDetail,
    authorCreateGet,
    authorCreatePost,
    authorDeleteGet,
    authorDeletePost,
    authorUpdateGet,
    authorUpdatePost
};