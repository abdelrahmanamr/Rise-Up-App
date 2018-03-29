var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Company = mongoose.model('Company');

module.exports.getCompanyByName = function ( req, res, next) {
    if(!Validations.isString(req.params.name)){
        return res.status(422).json({
            err:null,
            msg: 'name parameter must be a valid string.',
            data:null

        });

    }
    var comparedString =  req.params.name.toLowerCase();
    Company.find({
        name:/.*comparedString.*/
    }).exec(function (err,companies) {
        if(err){
            return next(err);
        }
        res.status(200).json({
            err:null,
            msg:'All companies containg this name'+req.params.name+'retrieved successfully',
            data:companies
        });
    });
};

module.exports.getCompanyByType = function ( req, res, next) {
    if(!Validations.isString(req.params.type)){
        return res.status(422).json({
            err:null,
            msg: 'type parameter must be a valid string.',
            data:null

        });
    }
    var comparedString =  req.params.name.toLowerCase();
    Company.find({
        type:/.*comparedString.*/
    }).exec(function (err,companies) {
        if(err){
            return next(err);
        }
        res.status(200).json({
            err:null,
            msg:'All companies containg this type'+req.params.type+'retrieved successfully',
            data:companies
        });
    });
};