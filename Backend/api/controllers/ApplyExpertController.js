//names: Ahmed Akram,Ahmed Hossam, Karim ElGhandour
var mongoose = require('mongoose'),
	moment = require('moment'),
	Validations = require('../utils/Validations'),
	ApplyExpert = mongoose.model('ApplyExpert');
User = mongoose.model('User');
Validations = require('../utils/Validations'),


/* Methods : createApplyExpert,getApplications,checkIfApplied
Date Edited : 5/5/2018
*/



module.exports.createApplyExpert = function (req, res, next) {  // Adding a user that wants to be an expert to applied list to be reviewd by admins by checking input IDs
	var valid =
		Validations.isObjectId(req.body.userid) &&
		req.body.previousExperience &&
		Validations.isString(req.body.previousExperience)
		;
	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'userid and previous experience must be valid paramaters',
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

					ApplyExpert.create(req.body, function (err, content) {
						if (err) {
							return next(err);
						}
						res.status(201).json({
							err: null,
							msg: 'Apply to be Expert was created successfully.',
							data: content
						});
					});
				}
			}
		});
	}
}

module.exports.getApplications = function (req, res, next) {
	ApplyExpert.find({}).exec(function (err, application) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			err: null,
			msg: 'applications retrieved successfully.',
			data: application
		});
	});
};

module.exports.checkIfApplied = function(req,res,next){
	if (!Validations.isObjectId(req.params.userId)) {
		return res.status(422).json({
		  err: null,
		  msg: 'userId parameter must be a valid ObjectId',
		  data: null
		});
	}

	ApplyExpert.findOne({userid:req.params.userId}).exec(function (err, user) {
		if (err) {
			return next(err);
		}
		else {
			if (!user) {
				return res
					.status(200)
					.json({ err: null, msg: null, data: {exist:false} });
			} 
			else {
				return res
					.status(422)
					.json({err:"Already Applied",msg:"You already applied before",data:{exist:true}})
			}
		}
	});

}

