const { body, validationResult } = require('express-validator');
const BookInstance = require('../models/book-instance');
const Book = require('../models/book');

// display a list of all bookinstaces
function bookInstanceList (req, res, next) {
    BookInstance.find()
        .populate('book')
        .exec(function (err, bookInstances) {
            if (err) { return next(err); }
            // successful, so render
            res.render('book-instance-list', { title: 'Book Instance List', bookInstances });
    });
}

// display detail page for a specific bookinstance
function bookInstanceDetail (req, res, next) {
    
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function (err, bookInstance) {
            if (err) { 
                return next(err); 
            }
            if (bookInstance === null) { // no results
                const err = new Error('Book copy not found');
                err.status = 404;
                return next(err);
            }
            // successful, so render
            res.render('book-instance-detail', { title: 'Copy: ' + bookInstance.book.title, bookInstance });
        });

}

// display BookInstance create form on GET
function bookInstanceCreateGet (req, res, next) {
    Book.find({},'title')
        .exec(function (err, bookList) {
            if (err) { 
                return next(err); 
            }
            // successful, so render.
            res.render('book-instance-form', {title: 'Create Book Instance', bookList});
    });
}

// handle BookInstance create on POST
const bookInstanceCreatePost = [

    // validate and sanitize fields
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('dueBack', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    // process request after validation and sanitization
    (req, res, next) => {

        // extract the validation errors from a request
        const errors = validationResult(req);

        // create a BookInstance object with escaped and trimmed data
        const bookInstance = new BookInstance(
          { book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            dueBack: req.body.dueBack
           });

        if (!errors.isEmpty()) {
            // there are errors - render form again with sanitized values and error messages
            Book.find({},'title')
                .exec(function (err, bookList) {
                    if (err) { 
                        return next(err); 
                    }
                    // successful, so render
                    res.render('book-instance-form', { title: 'Create Book Instance', bookList, selectedBook: bookInstance.book._id, errors: errors.array(), bookInstance});
            });
            return;
        }
        else {
            // data from form is valid
            bookInstance.save(function (err) {
                if (err) { 
                    return next(err); 
                }
                // successful - redirect to new record
                res.redirect(bookInstance.url);
            });
        }
    }
];

// display BookInstance delete form on GET
function bookInstanceDeleteGet (req, res, next) {

    BookInstance
        .findById(req.params.id)
        .populate('book')
        .exec(function (err, bookInstance) {
            if (err) { 
                return next(err); 
            }

            if (bookInstance === null) { // no results
                const err = new Error('Book copy not found');
                err.status = 404;
                return next(err);
            }

            // successful, so render
            res.render('book-instance-delete', { title: 'Delete Book Instance', bookInstance});
        });

}

// handle BookInstance delete on POST
function bookInstanceDeletePost (req, res, next) {

    BookInstance
    .findById(req.params.id)
    .populate('book')
    .exec(function (err, bookInstance) {
        if (err) { 
            return next(err); 
        }

        if (bookInstance === null) { // no results
            const err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }

        // successful, so delete
        BookInstance
            .findByIdAndRemove(req.params.id, function deleteBookInstance(err) {
            if (err) { 
                return next(err); 
            }
            // success - go to book instances list
            res.redirect('/catalog/bookinstances');
        });
    });
}

// display BookInstance update form on GET
function bookInstanceUpdateGet (req, res, next) {
    BookInstance.findById(req.params.id)
      .exec((err, bookInstance) => {
        if (err) {
          return next(err);
        }

        if (bookInstance === null) { // no results
          const err = new Error('Book copy not found');
          err.status = 404;
          return next(err);
        }

        Book.find({},'title')
        .exec(function (err, bookList) {
            if (err) { 
                return next(err); 
            }
            // successful, so render
            res.render('book-instance-form', { title: 'Update Book Instance', bookList, selectedBook: bookInstance.book._id.toString(), bookInstance});
        });
    });
}

// handle BookInstance update on POST
const bookInstanceUpdatePost = [

    // validate and sanitize fields
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('dueBack', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    // process request after validation and sanitization
    (req, res, next) => {

        // extract the validation errors from a request
        const errors = validationResult(req);

        // create a BookInstance object with escaped and trimmed data
        const bookInstance = new BookInstance(
          { book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            dueBack: req.body.dueBack,
            _id: req.params.id
           });

        if (!errors.isEmpty()) {
            // there are errors - render form again with sanitized values and error messages
            Book.find({},'title')
                .exec(function (err, bookList) {
                    if (err) { 
                        return next(err); 
                    }
                    // successful, so render
                    res.render('book-instance-form', { title: 'Create Book Instance', bookList, selectedBook: bookInstance.book._id, errors: errors.array(), bookInstance});
            });
            return;
        }
        else {
            // data from form is valid
            BookInstance.findByIdAndUpdate(req.params.id, bookInstance, {}, (err, result) => {
                if (err) {
                    return next(err);
                }

                // successful - redirect to updated book instance
                res.redirect(bookInstance.url);
            });
        }
    }
];

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