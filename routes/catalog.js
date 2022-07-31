const express = require('express');

// require controller modules
const bookController = require('../controllers/bookController');
const bookInstanceController = require('../controllers/bookInstanceController');
const genreController = require('../controllers/genreController');
const authorController = require('../controllers/authorController');

// create router
const router = express.Router();

/* Book routes */

// GET catalog home page
router.get('/', bookController.index);

// GET request to create a Book
// This must come before routes that display Book (i.e uses id)
router.get('/book/create', bookController.bookCreateGet);

// POST request to create a Book
router.post('/book/create', bookController.bookCreatePost);

// GET request to delete a Book
router.get('/book/:id/delete', bookController.bookDeleteGet);

// POST request to delete a Book
router.post('/book/:id/delete', bookController.bookDeletePost);

// GET request to update a Book
router.get('/book/:id/update', bookController.bookUpdateGet);

// POST request to update a Book
router.post('/book/:id/update', bookController.bookUpdatePost);

// GET request for one Book
router.get('/book/:id', bookController.bookDetail);

// GET request to list all Books
router.get('/books', bookController.bookList);

/* Author routes */

// GET request to create Author
// This must come before routes that use Author id
router.get('/author/create', authorController.authorCreateGet);

// POST request to create Author
router.post('/author/create', authorController.authorCreatePost);

// GET request to delete Author
router.get('/author/:id/delete', authorController.authorDeleteGet);

// POST request to delete Author
router.post('/author/:id/delete', authorController.authorDeletePost);

// GET request to update Author
router.get('/author/:id/update', authorController.authorUpdateGet);

// POST request to update Author
router.post('/author/:id/update', authorController.authorUpdatePost);

// GET request for one Author
router.get('/author/:id', authorController.authorDetail);

// GET request to list all Authors
router.get('/authors', authorController.authorList);

/* Genre routes */

// GET request to create a Genre
// This must come before routes that use Genre id
router.get('/genre/create', genreController.genreCreateGet);

// POST request to create Genre
router.post('/genre/create', genreController.genreCreatePost);

// GET request to delete Genre
router.get('/genre/:id/delete', genreController.genreDeleteGet);

// POST request to delete Genre
router.post('/genre/:id/delete', genreController.genreDeletePost);

// GET request to update Genre
router.get('/genre/:id/update', genreController.genreUpdateGet);

// POST request to update Genre
router.post('/genre/:id/update', genreController.genreUpdatePost);

// GET request for one Genre
router.get('/genre/:id', genreController.genreDetail);

// GET request to list all Genres
router.get('/genres', genreController.genreList);

/* BookInstance routes */

// GET request to create a BookInstance
// This must come before routes that use BookInstance id
router.get('/bookinstance/create', bookInstanceController.bookInstanceCreateGet);

// POST request to create a BookInstance
router.post('/bookinstance/create', bookInstanceController.bookInstanceCreatePost);

// GET request to delete a BookInstance
router.get('/bookinstance/:id/delete', bookInstanceController.bookInstanceDeleteGet);

// POST request to delete a BookInstance
router.post('/bookinstance/:id/delete', bookInstanceController.bookInstanceDeletePost);

// GET request to update a BookInstance
router.get('/bookinstance/:id/update', bookInstanceController.bookInstanceUpdateGet);

// POST request to update a BookInstance
router.post('/bookinstance/:id/update', bookInstanceController.bookInstanceUpdatePost);

// GET request for one BookInstance
router.get('/bookinstance/:id', bookInstanceController.bookInstanceDetail);

// GET request to list all BookInstances
router.get('/bookinstances', bookInstanceController.bookInstanceList);

module.exports = router;