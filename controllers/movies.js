const Movie = require('../models/movie');
// const Users = require('../models/user');

// show watchlist movies
const index = (req, res) => {
    Movie.find({}, (err, movies) => {
        if(err) {
            console.log(err);
        }
        res.render('watchlists/movie', {
            title: 'MOVIE LIST',
            movies,
            user: req.user
        });
    });
}

// run search movie page
const searchMovie = (req, res) => {
    res.render('watchlists/new', {
        title: 'SEARCH MOVIE',
        movies: [],
        user: req.user
    });
}

// get review & save
const show = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        // console.log(movie);
        // const status = movie.status.push(req.body);
        // console.log(status);
        if(err) {
        console.log(err);
        }
    res.render('watchlists/review',
        {
            title: 'Movie Review',
            movie,
            user: req.user
        })
    })
}

const review = (req, res) => {
    console.log(req.body);
    Movie.findById(req.params.id, (err, movie) => {
        // console.log(movie);
        movie.reviews.push(req.body);
        // console.log(movie.reviews);
        movie.save((err) => {
            if(err) {
                console.log(err);
            } res.render('watchlists/review',
                {
                title: 'Movie Review',
                movie,
                user: req.user
            })
    
        })
    })
}

const deleteReview = (req, res) => {
    Movie.findById(req.params.id, async (err, movie) => {
        if(err) {
            console.log(err);
        }
        // console.log(movie, req.params.reviewId)

        movie.reviews = movie.reviews.filter(r => r._id.toString() !== req.params.reviewId)

        await movie.save()
        console.log(movie.reviews);
        return res.redirect(`/movies/${movie._id}`)
    })
}

const deleteMovie = (req, res) => {
    Movie.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            console.log(err);
        } res.redirect('/movies');
    })
}

module.exports = {
    index,
    searchMovie,
    show,
    review,
    deleteMovie,
    deleteReview
}