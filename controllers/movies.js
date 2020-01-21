const Movies = require('../models/movie');
// const Users = require('../models/user');

// show watchlist movies
const index = (req, res) => {
    Movies.find({}, (err, movies) => {
        if(err) {
            console.log(err);
        }
        res.render('watchlists/movie', {
            title: 'MOVIE LIST',
            movies
        });
    });
}

// run search movie page
const searchMovie = (req, res) => {
    res.render('watchlists/new', {
        title: 'SEARCH MOVIE',
        movies: [],
    });
}

// get review & save
const show = (req, res) => {
    Movies.findById(req.params.id, (err, movie) => {
        // console.log(movie);
        // const status = movie.status.push(req.body);
        // console.log(status);
        if(err) {
        console.log(err);
        }
    res.render('watchlists/review',
        {
            title: 'Movie Review',
            movie
        })
    })
}

const review = (req, res) => {
    console.log(req.body);
    Movies.findById(req.params.id, (err, movie) => {
        // console.log(movie);
        movie.reviews.push(req.body);
        // console.log(movie.reviews);
        movie.save((err) => {
            if(err) {
                console.log(err);
            }
            res.render('watchlists/review',
            {
            title: 'Movie Review',
            movie
            })
    
        })
    })
}

module.exports = {
    index,
    searchMovie,
    show,
    review
}