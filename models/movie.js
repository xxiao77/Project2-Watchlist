const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const categorySchema = new Schema ({
//     id: String,
//     name: String
// })

const movieSchema = new Schema ({
    movieId: String,
    externalId: String,
    name: String,
    image: String,
    trailer: String
    // category: categorySchema
}, {
    timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema);

