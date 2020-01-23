var express = require('express');
var router = express.Router();
var axios = require('axios');
const Movie = require('../models/movie');

const moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.index);
router.get('/search', moviesCtrl.searchMovie);
router.get('/:id', moviesCtrl.show);
router.delete('/:id', moviesCtrl.deleteMovie);
router.post('/:id/review', moviesCtrl.review);
router.delete('/:id/review/:reviewId', moviesCtrl.deleteReview);

// get input from "search" form & search movie
router.post('/search', async(req, res) => {
    // input name
    const query = req.body['newMovie'];
    // console.log(query); 
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
    // Movie.find() <- This is Query
    // Query.exec() <- promise

    const movie = await Movie.find({externalId: req.body['externalId']}).exec();
    // console.log(movie);
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
    // console.log(trailers);
    trailers.forEach(t => {
        trailerKey = t.key;
    });
    // console.log(trailerKey);
    newMovie.trailer = trailerKey;
    
    newMovie.save((err) => {
        if(err) {
            console.log(err);
        }
        return res.redirect('/movies');
    })
});

module.exports = router;

