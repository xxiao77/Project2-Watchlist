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
    Movie.findById(req.params.id, (err, movie) => {
        movie.reviews.push(req.body);
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

const editReview = (req, res) => {
    Movie.findById(req.params.id, async (err, movie) => {
        if(err) {
            console.log(err);
        }
        var review = movie.reviews.filter(r => r.id === req.params.reviewId);
        review[0].content = req.body['edit']
        await movie.save();
        return res.redirect(`/movies/${movie._id}`)
    })
}

const deleteReview = (req, res) => {
    console.log(req.body);
    Movie.findById(req.params.id, async (err, movie) => {
        if(err) {
            console.log(err);
        } 
        movie.reviews = movie.reviews.filter(r => r._id.toString() !== req.params.reviewId)
        await movie.save();
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
    deleteReview,
    editReview
}