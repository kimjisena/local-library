const BookInstance = require('../models/book-instance');

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