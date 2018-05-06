var mongoose = require('mongoose');

var suggestedCompanySchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        lowercase: true
    },
    views: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

mongoose.model('SuggestedCompany', suggestedCompanySchema);
