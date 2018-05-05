// names : saleh el hadidiy , loai alaa , mohamed el gabry , shehab el shenawy , abdelrahman ashraf
var mongoose = require('mongoose'),
moment = require('moment'),
jwt = require('jsonwebtoken'),
Validations = require('../utils/Validations'),
Encryption = require('../utils/Encryption')
User = mongoose.model('User');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');
var smtpTransport = require('nodemailer-smtp-transport');

/* Methods : Edit,ViewUsers,ChangePassword,Expire,ResetPassword,forgetPassword,ViewUser,GetUserByUserName,Register,CheckUserName,Login
Date Edited : 5/5/2018
*/
module.exports.edit = function(req, res, next) { // this method edits attributes of the user in the backend
	if (!Validations.isObjectId(req.params.id)) {
		return res.status(422).json({
			err: null,
			msg: 'User ID  parameter must be a valid ObjectId.',
			data: null
		});
	}
	delete req.body.createdAt;
	req.body.updatedAt = moment().toDate();

	User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
			).exec(function(err, updatedUser) {
				if (err) {
					return next(err);
				}
				if (!updatedUser) {
					return res
							.status(404)
							.json({ err: null, msg: 'User not found.', data: null });
				}
				res.status(200).json({
					err: null,
					msg: 'User was updated successfully.',
					data: null
				});
			});
};


module.exports.viewUsers = function(req, res, next) { // this method views all users in the backend
	User.find({expert:true}).exec(function(err, users) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			err: null,
			msg: 'users retrieved successfully.',
			data: users
		});
	});
};

module.exports.expire = function(req,res,next){  // Checks if the password reset token before letting the user reset his password after pressing on the link in his  mail



	User.findOne({ resetPasswordToken: req.params.token,resetPasswordExpires: { $gt: Date.now() }  }, function(err, user) {
		if (!user) {
			return res.status(422).json({
				err: null,
				msg: 'Expired',
				data: null
			});
		}else{
			return res.status(201).json({
				err: null,
				msg: 'Not Expired',
				data: null
			});



		}
	});
}


module.exports.ChangePassword = function(req,res,next){ // this method updates password of certain user
	var valid = req.body.newpassword && Validations.isString(req.body.newpassword) &&
			req.body.confirmpassword && Validations.isString(req.body.confirmpassword) &&
			req.body.oldpassword && Validations.isString(req.body.oldpassword);

	if(!valid){
		return res.status(422).json({
			err:null,
			msg:'Wrong input data',
			data:null
		});
	}
	else{
		User.findById(req.params.userId).exec(function(err, userfound) {
			if (err) {
				return next(err);
			}
			if (!userfound) {
				return res
						.status(404)
						.json({ err: null, msg: 'Username was not found.', data: null });
			}
			else{
				Encryption.comparePasswordToHash(req.body.oldpassword,userfound.password,function(err,matched){
					if(err){
						return next(err)
					}else if(!matched){
						return res.status(422).json({
							err:null,
							msg:'Old password is wrong',
							data:null
						});
					}else{
						var newpassword = req.body.newpassword.trim();
						if(newpassword.length < 6){
							return res.status(422).json({
								err: null,
								msg: 'Your new password does not meet the minimum length requirement',
								data: null
							});
						}
						else{
							if(newpassword != (req.body.confirmpassword.trim())){
								return res.status(422).json({
									err:null,
									msg:'New Password does not match Confirm Password',
									data:null
								});

							}else{
								Encryption.hashPassword(req.body.newpassword,function(err,hash){
									if(err){
										return next(err);
									}else{
										userfound.password = hash;
										userfound.save(function(err,userfound,num){
											if(err){
												return res.status(422).json({
													err: null,
													msg: 'Error saving new data',
													data: null
												});
											}else{
												return res.status(201).json({
													err: null,
													msg: 'Success',
													data: userfound
												});
											}
										});
									}
								});
							}
						}
					}
				});

			}
		});
	}
}



module.exports.reset = function(req,res,next){ // this method resets the password for the user



	User.findOne({ resetPasswordToken: req.params.token,resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		if (!user) {
			return res.status(422).json({
				err: null,
				msg: 'No user with this tokens',
				data: null
			});
		}
		else {
			if (req.body.password.length < 6) {

				return res.status(422).json({
					err: null,
					msg: "Password doesn't meet length requirements",
					data: null
				});
			}
			else {
				Encryption.hashPassword(req.body.password, function (err, hash) {
					if (err) {
						return next(err);
					}
					req.body.password = hash;
					user.password = hash;
					user.resetPasswordToken = null;
					user.resetPasswordExpires = null;
					user.save(function (err, user, num) {
						if (err) {
							return res.status(422).json({
								err: err,
								msg: "Error updating user's password",
								data: null
							});
						}
						else {
							var smtpTransport = nodemailer.createTransport({
								service: 'SendGrid', // sets automatically host, port and connection security settings
								auth: {
								user: 'startupkit_t18',
								pass: 'T18mail123'
							}
							});


							// setup email data with unicode symbols
							var mailOptions = {
									to: user.email,
									from: 'startupkit.18@gmail.com',
									subject: 'Riseup Connect Password Reset',
									text: 'Your pass has changed'
							};


							smtpTransport.sendMail(mailOptions, (error, info) => {
								if (error) {

									return res.status(422).json({
										err: null,
										msg: "Error updating user's token",
										data: null
									});

								} else {
									return res.status(201).json({
										err: null,
										msg: 'Success',
										data: user
									});
								}
								smtpTransport.close(); // shut down the connection pool, no more messages.
							});
						}
					});
				});


			}
		} });

};


module.exports.forgetPassword = function(req,res,next){ // this method helps the user to sign in after forgetting his password

	var token = randomToken(16);
	if(token!=null){
		User.findOne({ email: req.body.email }, function(err, user) {
			if (!user) {
				return res.status(422).json({
					err: null,
					msg: 'No user with this email',
					data: null
				});
			}
			else{
				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
				user.save(function(err,user,num) {
					if(err){
						return res.status(422).json({
							err: null,
							msg: "Error updating user's token",
							data: null
						});
					}
					else{
						var smtpTransport = nodemailer.createTransport({
							service: 'SendGrid', // sets automatically host, port and connection security settings
							auth: {
							user: 'startupkit_t18',
							pass: 'T18mail123'
						}
						});


						// setup email data with unicode symbols
						var mailOptions = {
								to: user.email,
								from: 'startupkit.18@gmail.com',
								subject: 'Riseup Connect Password Reset',
								text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
								'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
								'http://' + 'startupkit.kghandour.me/#/user' + '/reset/' + token + '\n\n' +
								'If you did not request this, please ignore this email and your password will remain unchanged.\n'
						};


						smtpTransport.sendMail(mailOptions, (error, info) => {
							if (error) {
								return res.status(422).json({
									err: null,
									msg: "Error updating user's token",
									data: null
								});

							} else {
								return   res.status(201).json({
									err: null,
									msg: 'Success',
									data: user
								});
							}
							smtpTransport.close(); // shut down the connection pool, no more messages.
						});
					}
				});

			}
		});
	}
};



module.exports.viewUser = function(req, res, next) { // retrives information of certain user
	if (!Validations.isObjectId(req.params.userId)) {
		return res.status(422).json({
			err: null,
			msg: 'userId parameter must be a valid ObjectId.',
			data: null
		});
	}
	User.findById(req.params.userId).exec(function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res
					.status(404)
					.json({ err: null, msg: 'user not found.', data: null });
		}
		res.status(200).json({
			err: null,
			msg: 'user retrieved successfully.',
			data: user
		});
	});
};

module.exports.getUserByUsername = function(req, res, next) { //  gets  the user by his username
	if (!Validations.isString(req.params.username)){
		return res.status(422).json({
			err: null,
			msg: 'Username parameter must be a valid string.',
			data: null
		});
	}
	User.findOne({"username":req.params.username}).exec(function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res
					.status(404)
					.json({ err: null, msg: 'user not found.', data: null });
		}
		res.status(200).json({
			err: null,
			msg: 'user retrieved successfully.',
			data: user
		});
	});
}


module.exports.register = function(req,res,next){ // registers user and adds him in the database
	var valid =
			req.body.email &&
			Validations.isString(req.body.email) &&
			req.body.password &&
			Validations.isString(req.body.password) &&
			req.body.confirmPassword &&
			Validations.isString(req.body.confirmPassword);
	if(!valid){
		return res.status(422).json({
			err:null,
			msg:'Wrong input data',
			data:null
		});
	}else{
		var password = req.body.password.trim();
		if(password.length < 6){

			return res.status(422).json({
				err:null,
				msg:"Password doesn't meent length requirements",
				data:null
			});
		}else{
			if(password !== (req.body.confirmPassword.trim())){
				return res.status(422).json({
					err: null,
					msg: 'password and confirmPassword does not match.',
					data: null
				});
			}else{
				User.findOne({$or:[{email: req.body.email.trim().toLowerCase()},{username:req.body.username.trim().toLowerCase()}]}).exec(function(err,user){
					if(err){
						return next(err);
					}
					else{
						if(user){
							if(user.username==req.body.username.trim().toLowerCase()){
								return res.status(422).json({
									err: null,
									msg: 'A user already exists with the same username',
									data: null
								});
							}else{
								return res.status(422).json({
									err: null,
									msg: 'A user already exists with the same email',
									data: null
								});
							}
						}
						delete req.body.createdAt;
						delete req.body.updatedAt;

						Encryption.hashPassword(req.body.password,function(err,hash){
							if(err){
								return next(err);
							}
							password = hash;
							req.body.password = hash;

							User.create(req.body, function(err, newUser) {
								if (err) {
									return next(err);
								}
								res.status(201).json({
									err: null,
									msg: 'Registration successful, you can now login to your account.',
									data: newUser.toObject()
								});

							});


						})
						;
					};
				});
			};
		}
	};
};

module.exports.checkUsername = function(req, res, next){ // check for the validity of the username
	var valid = req.body.username &&
			Validations.isString(req.body.username);
	if (!valid){
		return res.status(422).json({
			err:null,
			msg:"Please enter a valid username",
			data:null
		});
	}
	else {
		toCheck = req.body.username.trim().toLowerCase();
		User.findOne({username:toCheck}).exec(function(err,userfound){
			if(err){
				return next(err);
			}
			else {
				if(userfound){
					return res.status(422).json({
						err: null,
						msg: "user already exists",
						data: null
					});
				}
				else {
					return res.status(200).json({
						err: null,
						msg: "user unique",
						data: null
					});
				}
			}
		});
	}
}

module.exports.login = function(req,res,next){ // this method is responsible for logging the user into his account
	var valid =
			((req.body.email &&
					Validations.isString(req.body.email)) ||(req.body.username &&
							Validations.isString(req.body.username))) &&
							req.body.password &&
							Validations.isString(req.body.password);
	if(!valid){
		return res.status(422).json({
			err:null,
			msg:"Wrong input data",
			data:null
		});
	}
	else{
		var toCheck = null;
		if(req.body.email==null){
			toCheck = req.body.username.trim().toLowerCase();
		}else{
			toCheck = req.body.email.trim().toLowerCase()
		}
		User.findOne({$or:[{email:toCheck},{username:toCheck}]}).exec(function(err,userfound){
			if(err){
				return next(err);
			}

			else{

				if(!userfound){

					return res.status(422).json({
						err:null,
						msg:"No user with this username/email was found",
						data:null
					});
				}
				else{

					Encryption.hashPassword(req.body.password.trim().toLowerCase(), function(err, password) {
					})
					Encryption.comparePasswordToHash(req.body.password,userfound.password,function(err,passMatched){
						if(err){
							return next(err);
						}
						else{
							if(!passMatched){
								return res.status(422).json({
									err:null,
									msg:"Wrong password",
									data:null
								});
							}
							else{
								if(userfound["blocked"]){
									return res.status(422).json({
										err:null,
										msg:"You are blocked",
										data:null
									});
								}
								else{
									var token = jwt.sign(
											{
												user:userfound.toObject()
											},
											req.app.get('secret'),
											{
												expiresIn: '1h'
											}
											);
									res.status(200).json({
										err:null,
										msg:"Login sucessfull",
										data:token
									})
								}
							}
						}
					});
				}
			}
		});
	}
}
