var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Company = mongoose.model('Company'),
    regex = require("regex"),
  elasticsearch = require('elasticsearch'),
   Promise = require('bluebird');

 var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
     keepAlive: 'true'
});

client.ping({
    requestTimeout: Infinity,
    body: 'hello JavaSampleApproach!'
});

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
// function createIndex() {           // to be run once for the database to create the index
//     client.indices.create({
//         index: 'elasticsearch'
//     }, function (err, res, status) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("create", res);
//         }
//     })
// };
// function createMapping() {        // to be run once for the database to create the mapping
//     client.indices.putMapping({
//         index: 'elasticsearch',
//         type: 'tags',
//         body: {
//             properties: {
//                 'name': {
//                     'type': 'text', // type is a required attribute if index is specified
//                     'analyzer': 'english'
//                 },
//                 'root': {
//                     'type': 'text', // type is a required attribute if index is specified
//                     'analyzer': 'english'
//                 }
//             }
//         }
//     }, function (err, resp, status) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log(resp);
//         }
//     })
// };

function addToIndex(){
    client.index({
    index:'elasticsearch',
    type:'tags',
    id:'1',
    body:{
     name:'abdo',
     root:'omar'
    }
    });
}

module.exports.getAllTags =function(req, res, next) {
    client.search({
        index: 'elasticsearch',
        type: 'tags',
        body: {
            'query': {
                'match_all': {}
            }
        }
    }).exec(function (err,tags) {
        if(err){
            return next(err);
        }
        return res.status(200).json({
            err:null,
            msg:'All companies containg this name'+'retrieved successfully',
            data:tags
        });
    });
};


Promise.resolve()
.then(addToIndex)
//    .then(createMapping);
