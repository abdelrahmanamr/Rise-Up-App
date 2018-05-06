/* 
Name: Khaled Abou El Naga
Date Created : 4/4/2018
*/

var mongoose = require('mongoose');

var suggestedContentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
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
    rating: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    status: {
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

module.exports = mongoose.model('SuggestedContent', suggestedContentSchema);