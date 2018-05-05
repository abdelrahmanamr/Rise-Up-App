var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
    reporterName: {
        type: String,
        required: true
    },
    reporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reportedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reportedName: {
        type: String,
        required: true
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    commentBody: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

module.exports = mongoose.model('Report', reportSchema);