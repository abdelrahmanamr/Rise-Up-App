var mongoose = require('mongoose');

var ratingSchema = mongoose.Schema({
    contentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date

});


module.exports = mongoose.model('Rating', ratingSchema);