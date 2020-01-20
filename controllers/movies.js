const Movies = require('../models/movie');
const Users = require('../models/user');

const index = (req, res) => {
    // const newStatus = new Movies(req.body);
    // console.log(newMovie);
    
    Movies.find({}, (err, movies) => {
        if(err) {
            console.log(err);
        }
        // newMovie.save((err) => {
    //     if(err) {
    //         console.log(err);
    //     }
    //     res.render('watchlists/movie', {
            // title: 'MOVIE LIST',
            // movies
        // });
    // })
        res.render('watchlists/movie', {
            title: 'MOVIE LIST',
            movies
        });
    });
}

const searchMovie = (req, res) => {
    res.render('watchlists/new', {
        title: 'SEARCH MOVIE',
        movies: [],
    });
}

// const create = (req, res) => {
//     const newMovie= new Movies(req.body);
//     console.log(newMovie);
//     newMovie.save((err) => {
//         if(err) {
//             console.log(err);
//         }
//         return res.redirect('/movies');
//     })
// };

const review = (req, res) => {
    Movies.findById(req.params.id, (err, movie) => {
        console.log(movie);
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

module.exports = {
    index,
    searchMovie,
    // create,
    review
}