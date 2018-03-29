var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Content = mongoose.model('Content');

module.exports.getContents = function(req, res, next) {
    Content.find({}).exec(function(err, users) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err: null,
            msg: 'Contents retrieved successfully.',
            data: users
        });
    });
};


