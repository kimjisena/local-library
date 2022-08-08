const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');
const { body, validationResult } = require('express-validator');

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
function authorDetail (req, res, next) {
    
    async.parallel({
        author(callback) {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authorBooks(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { 
            return next(err); 
        } // error in API usage
        if (results.author === null) { // no results.
            const err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // successful, so render
        res.render('author-detail', {
          title: 'Author Detail',
          author: results.author,
          authorBooks: results.authorBooks,
        });
    });
}

// display Author create form on GET
function authorCreateGet (req, res, next) {
    res.render('author-form', { title: 'Create Author'});
}

// handle Author create on POST
const authorCreatePost = [

    // validate and sanitize fields
    body('firstName').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('familyName').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('dateOfBirth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('dateOfDeath', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // process request after validation and sanitization
    (req, res, next) => {

        // extract the validation errors from a request
        const errors = validationResult(req);

        // create an Author object with escaped and trimmed data.
        const author = new Author({
            firstName: req.body.firstName,
            familyName: req.body.familyName,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath
        });

        if (!errors.isEmpty()) {
            // there are errors, render form again with sanitized values/errors messages
            res.render('author-form', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        } else {
            // data from form is valid.
            Author
                .findOne({firstName: req.body.firstName, familyName: req.body.familyName})
                .exec(function(err, foundAuthor) {
                    if (err) {
                        return next(err);
                    }
                    if (foundAuthor) {
                        // author exists, redirect to its detail page
                        res.redirect(foundAuthor.url);
                    } else {
                        author.save(function (err) {
                            if (err) { 
                                return next(err); 
                            }
                            // successful - redirect to new author record
                            res.redirect(author.url);
                        });
                    }
                });
        }
    }
];

// display Author delete form on GET
function authorDeleteGet (req, res, next) {
    
    async.parallel({
        author(callback) {
            Author.findById(req.params.id).exec(callback);
        },
        authorBooks(callback) {
            Book.find({ 'author': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { 
            return next(err); 
        }
        if (results.author === null) { // no results
            res.redirect('/catalog/authors');
        }

        // successful, so render
        res.render('author-delete', { title: 'Delete Author', author: results.author, authorBooks: results.authorBooks });
    });

}

// handle Author delete on POST
function authorDeletePost (req, res, next) {
    
    async.parallel({
        author(callback) {
          Author.findById(req.body.authorId).exec(callback);
        },
        authorBooks(callback) {
          Book.find({ 'author': req.body.authorId }).exec(callback);
        },
    }, function(err, results) {
        if (err) { 
            return next(err); 
        }
        // success
        if (results.authorBooks.length > 0) {
            // author has books, render in same way as for GET route
            res.render('author-delete', { title: 'Delete Author', author: results.author, authorBooks: results.authorBooks });
            return;
        } else {
            // author has no books, delete object and redirect to the list of authors
            Author.findByIdAndRemove(req.body.authorId, function deleteAuthor(err) {
                if (err) { 
                    return next(err); 
                }
                // success - go to author list
                res.redirect('/catalog/authors');
            });
        }
    });
}

// display Author update form on GET
function authorUpdateGet (req, res, next) {
    
    Author.findById(req.params.id)
        .exec((err, author) => {
            if (err) { 
                return next(err); 
            }
            if (author === null) { // no results
                const err = new Error('Author not found');
                err.status = 404;
                return next(err);
            }

            res.render('author-form', { title: 'Update Author', author});
        });
}

// handle Author update on POST
const authorUpdatePost = [

    // validate and sanitize fields
    body('firstName').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('familyName').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('dateOfBirth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('dateOfDeath', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // process request after validation and sanitization
    (req, res, next) => {

        // extract the validation errors from a request
        const errors = validationResult(req);

        // create an Author object with escaped and trimmed data.
        const author = new Author({
            firstName: req.body.firstName,
            familyName: req.body.familyName,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            // there are errors, render form again with sanitized values/errors messages
            res.render('author-form', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        } else {
            // data from form is valid
            Author
                .findByIdAndUpdate(req.params.id, author, {}, function (err, theAuthor) {
                    if (err) { 
                        return next(err); 
                    }
                       // successful - redirect to author detail page
                       res.redirect(theAuthor.url);
            });
        }
    }
];

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