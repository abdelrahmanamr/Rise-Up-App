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

module.exports.DeleteContent = function(req, res, next) {
    if (!Validations.isObjectId(req.params.contentId)) {
        return res.status(422).json({
            err: null,
            msg: 'contentId parameter must be a valid ObjectId.',
            data: null
        });
    }
    Content.findByIdAndRemove(req.params.contentId).exec(function(
        err,
        deletedContent
    ) {
        if (err) {
            return next(err);
        }
        if (!deletedContent) {
            return res
                .status(404)
                .json({ err: null, msg: 'Content not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'Content was deleted successfully.',
            data: deletedContent
        });
    });
};
