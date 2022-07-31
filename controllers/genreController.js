const Genre = require('../models/genre');

// display a list of all genres
function genreList (req, res) {
    res.send('Not Implemented: Genre list');
}

// display detail page for a specific genre
function genreDetail (req, res) {
    res.send('Not Implemented: Genre detail: ' + req.params.id);
}

// display Genre create form on GET
function genreCreateGet (req, res) {
    res.send('Not Implemented: Genre create GET');
}

// handle Genre create on POST
function genreCreatePost (req, res) {
    res.send('Not Implemented: Genre create POST');
}

// display Genre delete form on GET
function genreDeleteGet (req, res) {
    res.send('Not Implemented: Genre delete GET');
}

// handle Genre delete on POST
function genreDeletePost (req, res) {
    res.send('Not Implemented: Genre delete POST');
}

// display Genre update form on GET
function genreUpdateGet (req, res) {
    res.send('Not Implemented: Genre update GET');
}

// handle Genre update on POST
function genreUpdatePost (req, res) {
    res.send('Not Implemented: Genre update POST');
}

module.exports = {
    genreList,
    genreDetail,
    genreCreateGet,
    genreCreatePost,
    genreDeleteGet,
    genreDeletePost,
    genreUpdateGet,
    genreUpdatePost
};