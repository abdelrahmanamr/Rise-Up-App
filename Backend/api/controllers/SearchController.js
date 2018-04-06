var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Company = mongoose.model('Company'),
    Content = mongoose.model('Content'),
    User = mongoose.model('User'),
    regex = require("regex");


    module.exports.getCompanyByNameOrType = function ( req, res, next) {
        if(!Validations.isString(req.params.name)){
            return res.status(422).json({
                err:null,
                msg: 'name parameter must be a valid string.',
                data:null
    
            });
    
        }
        Company.find(
            {$or:[{name:{$regex:new RegExp(req.params.name)}},{type:{$regex:new RegExp(req.params.name)}}]}
        ).exec(function (err,companies) {
            if(err){
                return next(err);
            }
            return res.status(200).json({
                err:null,
                msg:'All companies containg this name or type'+req.params.name+'retrieved successfully',
                data:companies
            });
        });
    };

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
        name:{$regex:new RegExp(comparedString)}
    }).exec(function (err,companies) {
        if(err){
            return next(err);
        }
        return res.status(200).json({
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
    Company.find({
        type:{$regex:new RegExp(req.params.type)}
    }).exec(function (err,companies) {
        if(err){
            console.log(err);
            return next(err);
        }
        return res.status(200).json({
            err:null,
            msg:'All companies containg this type'+req.params.type+'retrieved successfully',
            data:companies
        });
    });
};
module.exports.getCompanyTags= function ( req, res, next) {

    if(!Validations.isString(req.params.tags)){
        return res.status(422).json({
            err:null,
            msg: 'tag parameter must be a valid string.',
            data:null

        });
    }
    Company.find({
        tags:{$regex:new RegExp(req.params.tags)}
    }).exec(function (err,companies) {
        if(err){
            console.log(err);
            return next(err);
        }
        return res.status(200).json({
            err:null,
            msg:'All companies containg this tag  '+req.params.tags+' retrieved successfully',
            data:companies
        });
    });
};
module.exports.getExpertTags= function ( req, res, next) {

    if(!Validations.isString(req.params.tags)){
        return res.status(422).json({
            err:null,
            msg: 'tag parameter must be a valid string.',
            data:null

        });
    }
    User.find({
        expert:true,
        tags:{$regex:new RegExp(req.params.tags)}
    }).exec(function (err,users) {
        if(err){
            console.log(err);
            return next(err);
        }
        return res.status(200).json({
            err:null,
            msg:'All experts containing this tag'+req.params.tags+'retrieved successfully',
            data:users
        });
    });
};

module.exports.getContentTags= function ( req, res, next) {

    if(!Validations.isString(req.params.tags)){
        return res.status(422).json({
            err:null,
            msg: 'tag parameter must be a valid string.',
            data:null

        });
    }
    Content.find({
        tags:{$regex:new RegExp(req.params.tags)}
    }).exec(function (err,content) {
        if(err){
            console.log(err);
            return next(err);
        }
        return res.status(200).json({
            err:null,
            msg:'All Content containg this tag  '+req.params.tags+' retrieved successfully',
            data:content
        });
    });
};

module.exports.getCompanyTagsOrName= function ( req, res, next) {

    if(!Validations.isString(req.params.tags)){
        return res.status(422).json({
            err:null,
            msg: 'tag parameter must be a valid string.',
            data:null

        });
    }
    Company.find({
        tags:{$regex:new RegExp(req.params.tags)},
        name:{$regex:new RegExp(req.params.tags)}
    }).exec(function (err,companies) {
        if(err){
            console.log(err);
            return next(err);
        }
        return res.status(200).json({
            err:null,
            msg:'All companies containg this tag  '+req.params.tags+' retrieved successfully',
            data:companies
        });
    });
};

module.exports.getCompanyTagsOrType= function ( req, res, next) {

    if(!Validations.isString(req.params.tags)){
        return res.status(422).json({
            err:null,
            msg: 'tag parameter must be a valid string.',
            data:null

        });
    }
    Company.find({
        tags:{$regex:new RegExp(req.params.tags)},
        type:{$regex:new RegExp(req.params.tags)}
    }).exec(function (err,companies) {
        if(err){
            console.log(err);
            return next(err);
        }
        return res.status(200).json({
            err:null,
            msg:'All companies containg this tag  '+req.params.tags+' retrieved successfully',
            data:companies
        });
    });
};

module.exports.getCompanyTagsOrNameOrType= function ( req, res, next) {

    if(!Validations.isString(req.params.tags)){
        return res.status(422).json({
            err:null,
            msg: 'tag parameter must be a valid string.',
            data:null

        });
    }
    Company.find({
        tags:{$regex:new RegExp(req.params.tags)},
        name:{$regex:new RegExp(req.params.tags)},
        type:{$regex:new RegExp(req.params.tags)}
    }).exec(function (err,companies) {
        if(err){
            console.log(err);
            return next(err);
        }
        return res.status(200).json({
            err:null,
            msg:'All companies containg this tag  '+req.params.tags+' retrieved successfully',
            data:companies
        });
    });
};