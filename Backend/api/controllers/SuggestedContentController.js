//Names : khaled el sayed , karim el ghandour , ahmed hossam , omar el zamarany , ali ossman 
var mongoose = require('mongoose'),
	moment = require('moment'),
	Validations = require('../utils/Validations'),
	SuggestedContent = mongoose.model('SuggestedContent');
User = mongoose.model('User');

module.exports.viewSuggestedContents = function (req, res, next) { // This method retrieves all suggested contents 
	SuggestedContent.find({}).exec(function (err, contents) {

/* Methods : viewSuggestedContents,viewSuggestedContent,updateSuggestedContent,removeSuggestedContent,createSuggestedContent
Date Edited : 5/5/2018
*/

		if (err) {
			return next(err);
		}
		res.status(200).json({
			err: null,
			msg: 'contents retrieved successfully.',
			data: contents
		});
	});
};


module.exports.viewSuggestedContent = function (req, res, next) { // this method retrieves attributes of certain content
	if (!Validations.isObjectId(req.params.contentId)) {
		return res.status(422).json({
			err: null,
			msg: 'contentId parameter must be a valid ObjectId.',
			data: null
		});
	}
	SuggestedContent.findById(req.params.contentId).exec(function (err, content) {
		if (err) {
			return next(err);
		}
		if (!content) {
			return res
				.status(404)
				.json({ err: null, msg: 'content not found.', data: null });
		}
		res.status(200).json({
			err: null,
			msg: 'content retrieved successfully.',
			data: content
		});
	});
};
module.exports.updateSuggestedContent = function (req, res, next) { // this method updates attributes of certain suggested content
	if (!Validations.isObjectId(req.params.contentId)) {
		return res.status(422).json({
			err: null,
			msg: 'contentId parameter must be a valid ObjectId.',
			data: null
		});
	}


	SuggestedContent.findByIdAndUpdate(
		req.params.contentId,
		{
			$set: req.body
		},
		{ new: true }
	).exec(function (err, updatedContent) {
		if (err) {
			return next(err);
		}
		if (!updatedContent) {
			return res
				.status(404)
				.json({ err: null, msg: 'Content not found.', data: null });
		}
		res.status(200).json({
			err: null,
			msg: 'Content was updated successfully.',
			data: updatedContent
		});
	});
};
module.exports.removeSuggestedContent = function (req, res, next) { // this method removes suggested content from the database
	if (!Validations.isObjectId(req.params.contentId)) {
		return res.status(422).json({
			err: null,
			msg: 'ContentId parameter must be a valid ObjectId.',
			data: null
		});
	}
	SuggestedContent.findByIdAndRemove(req.params.contentId).exec(function (
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

//Khaled Aboelnaga
module.exports.createSuggestedContent = function (req, res, next) {// This method creates a suggested content and adds it to the database
	var valid =
		req.body.title &&
		Validations.isString(req.body.title) &&
		req.body.body &&
		Validations.isString(req.body.body) &&
		req.body.userid &&
		Validations.isObjectId(req.body.userid) &&
		req.body.tags &&
		Validations.isString(req.body.tags)
		;
	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'test',
			data: null
		});
	} else {
		User.findById(req.body.userid).exec(function (err, user) {
			if (err) {
				return next(err);
			}
			else {
				if (!user) {
					return res
						.status(404)
						.json({ err: null, msg: 'User not found.', data: null });
				} else {


					// Security Check
					delete req.body.createdAt;
					delete req.body.updatedAt;

					SuggestedContent.create(req.body, function (err, content) {
						if (err) {
							return next(err);
						}
						res.status(201).json({
							err: null,
							msg: 'Suggested Content was created successfully.',
							data: content
						});
					});
				}
			}
		});
	}
}

