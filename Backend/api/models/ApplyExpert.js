/* 
Name: Ahmed Hossam
Date Created : 24/4/2018
*/

var mongoose = require('mongoose');

var applyExpertSchema = mongoose.Schema({
    previousExperience: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

mongoose.model('ApplyExpert', applyExpertSchema);