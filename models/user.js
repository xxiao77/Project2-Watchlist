const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema ({
    movieId: String,
    watched: Boolean,
    rating: {type: Number, min: 0, max: 5},
    review: String
}, {
    timestamps: true
})

const userSchema = new Schema ({
    name: String,
    email: String,
    googleId: String,
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }, 
    status: [statusSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);