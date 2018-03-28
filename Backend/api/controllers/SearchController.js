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
    Company.find({
        name:/.*req.params.name.*/
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


