//names : Mohamed lotfy , khaled el sayed , ahmed hossam
var mongoose = require('mongoose'),
	moment = require('moment'),
	Validations = require('../utils/Validations'),
	SuggestedCompany = mongoose.model('SuggestedCompany');


module.exports.addSuggestedCompany = function (req, res, next) { // Adds suggested company by id  to the database

	var valid =

		req.body.name &&
		Validations.isString(req.body.name) &&
		req.body.email &&
		Validations.isString(req.body.email) &&
		req.body.website &&
		Validations.isString(req.body.website) &&
		req.body.tags &&
		Validations.isString(req.body.tags) &&
		req.body.type &&
		Validations.isString(req.body.type)
		;
	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'name(String) , email(String) , website(String) , tags(String) and type(String) are required fields.',
			data: null
		});
	}

	User.findById(req.body.userid).exec(function (err, user) {
		if (err) {
			return next(err);
		}
		else {
			if (!user) {
				return res
					.status(404)
					.json({ err: null, msg: 'User not found,so you are un-authorized', data: null });
			} else {
				// Security Check
				delete req.body.createdAt;
				delete req.body.updatedAt;

				SuggestedCompany.create(req.body, function (err, suggestedCompany) {
					if (err) {
						return res.status(422).json({
							err: null,
							msg: 'Failed',
							data: suggestedCompany
						});
					}
					return res.status(201).json({
						err: null,
						msg: 'Company was suggested successfully.',
						data: suggestedCompany
					});
				});
			};
		}
	}
	);
};

module.exports.getSuggestedCompanies = function (req, res, next) { // retrieves all the companies in the database
	SuggestedCompany.find({ 'status': 0 }).exec(function (err, suggestedCompanies) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			err: null,
			msg: 'Suggested Companies retrieved successfully.',
			data: suggestedCompanies
		});
	});
};

module.exports.viewSuggestedCompany = function (req, res, next) { // retrieves a certain company in the database
	if (!Validations.isObjectId(req.params.companyId)) {
		return res.status(422).json({
			err: null,
			msg: 'companyId parameter must be a valid ObjectId.',
			data: null
		});
	}
	SuggestedCompany.findById(req.params.companyId).exec(function (err, company) {
		if (err) {
			return next(err);
		}
		if (!company) {
			return res
				.status(404)
				.json({ err: null, msg: 'Suggestedcompany not found.', data: null });
		}
		res.status(200).json({
			err: null,
			msg: 'SuggestedCompany retrieved successfully.',
			data: company
		});
	});
};

module.exports.updateSuggestedCompany = function (req, res, next) { // updates a certain attribute o fsuggested company in database 
	if (!Validations.isObjectId(req.params.companyId)) {
		return res.status(422).json({
			err: null,
			msg: 'companyId parameter must be a valid ObjectId.',
			data: null
		});
	}


	SuggestedCompany.findByIdAndUpdate(
		req.params.companyId,
		{
			$set: req.body
		},
		{ new: true }
	).exec(function (err, updatedCompany) {
		if (err) {
			return next(err);
		}
		if (!updatedCompany) {
			return res
				.status(404)
				.json({ err: null, msg: 'SuggestedCompany not found.', data: null });
		}
		res.status(200).json({
			err: null,
			msg: 'SuggestedCompany was updated successfully.',
			data: updatedCompany
		});
	});
};
