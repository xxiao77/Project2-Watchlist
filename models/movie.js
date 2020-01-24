const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const categorySchema = new Schema ({
//     id: String,
//     name: String
// })

const reviewSchema = new Schema ({
    movieId: String,
    rating: {type: Number, min: 0, max: 5},
    content: String,
    date: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
})
const movieSchema = new Schema ({
    userId: String,
    movieId: String,
    externalId: String,
    name: String,
    image: String,
    trailer: String,
    reviews: [reviewSchema]
    // category: categorySchema
}, {
    timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema);
