/* 
Name: Karim ElGhandour
Date Created : 13/3/2018
*/

var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    intro: {
        type: String
    },
    type: {
        type: String,
        enum: ["Post", "Link", "Image"],
        default: "Post"
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    ratingarray: {
        type: Array,
        default: []
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfRatings: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    boost: {
        type: Boolean,
        default: false
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

module.exports = mongoose.model('Content', contentSchema);