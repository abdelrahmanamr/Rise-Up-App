var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
         required:true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

module.exports = mongoose.model('Comment',commentSchema);