const Movies = require('../models/movie');

const index = (req, res) => {
    res.render('watchlists/movie')
}

const create = (req, res) => {

}

// const newMovies = async(req, res) => {
//     console.log(movie);
//     const movie = await axios(
//         `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`,
//         );
//     res.render('watchlists/new', {
//         movie: movie.data
//     })
//   }


module.exports = {
    index,
    create,
    // newMovies
}