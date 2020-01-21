var express = require('express');
var router = express.Router();
var axios = require('axios');
const Movies = require('../models/movie');

const moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.index);
router.get('/search', moviesCtrl.searchMovie);
router.get('/:id', moviesCtrl.show);
router.post('/:id/review', moviesCtrl.review)

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
    })
})

// get input from "new" form & save movie
router.post('/new', async(req, res) => {
    // check if duplicate
    for(let key in req.body) {
        if(req.body[key] === "") delete req.body[key];
    }

    const newMovie= new Movies(req.body);
    // console.log(newMovie.externalId);
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

