var express = require('express');
var router = express.Router();
var axios = require('axios');
const Movie = require('../models/movie');
const User = require('../models/user');

const moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.index);
router.get('/search', moviesCtrl.searchMovie);
router.get('/:id', moviesCtrl.show);
router.delete('/:id', moviesCtrl.deleteMovie);
router.post('/:id/review', moviesCtrl.review);
router.delete('/:id/review/:reviewId', moviesCtrl.deleteReview);
router.put('/:id/review/:reviewId', moviesCtrl.editReview);

router.post('/search', async(req, res) => {

    // get input movie name
    const query = req.body['newMovie'];
    const movie = await axios(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
    );
   
    res.render('watchlists/new', {
        title: 'SEARCH MOVIE',
        movies: movie.data.results,
        user: req.user
    })
})

// get input from "new" form & save movie
router.post('/new', async(req, res) => {

    // check if duplicate
    const movie = await Movie.find({userId: req.user._id, externalId: req.body['externalId']}).exec();
    if(movie.length > 0) {
        return res.redirect('/movies');
    }
    const newMovie = new Movie(req.body);
    console.log(newMovie);
    const trailer = await axios(
        `https://api.themoviedb.org/3/movie/${newMovie.externalId}/videos?api_key=${process.env.TMDB_API_KEY}`
    );
    var trailerKey;
    trailers = trailer.data.results;
    trailers.forEach(t => {
        trailerKey = t.key;
    });
    newMovie.userId = req.user._id;
    newMovie.trailer = trailerKey;
    
    newMovie.save((err) => {
        if(err) {
            console.log(err);
        }
        return res.redirect('/movies');
    })
});

module.exports = router;

