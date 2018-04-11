var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Company = mongoose.model('Company'),
    Content = mongoose.model('Content'),
    User = mongoose.model('User'),
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



module.exports.addToIndex = function (req,res,next){
    client.index({
    index:'elasticsearch',
    type:'tags',
    body:{
     name:req.body.name,
     type:req.body.type,
     object:req.body.object
    }
    });
    return res.status(200).json({
        err:null,
        msg:'Added to index',
        data:null
    });
}

module.exports.addToContentIndex = function (req,res,next){
    client.index({
        index:'contentelasticsearch',
        type:'title',
        body:{
            name:req.body.name,
            type:req.body.type,
            object:req.body.object
        }
    });
    return res.status(200).json({
        err:null,
        msg:'Added to index',
        data:null
    });
}


module.exports.getAllTags =function(req, res, next) {
    client.search({
        index: 'elasticsearch',
        type: 'tags',
        body: {
            'query': {
                "wildcard" : { "name" : "*" }
            }
        }
    }).then(function (hit) {
        if(!hit) {
            console.log(err);
            return next(err);
        }
        var hits = hit.hits.hits;
        console.log('hits: ',hits)

        return res.status(200).json({
            err:null,
            msg:'All Tags retrieved successfully',
            data:hit.hits.hits
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

module.exports.getTagbyKeyword =function(req, res, next) {
    client.search({
        index: 'elasticsearch',
        type: 'tags',
        body: {
            'query': {
                'match' :{ "name":req.params.tag}
            }
        }
    }).then(function (hit) {
        if(!hit) {
            console.log(err);
            return next(err);
        }
        var hits = hit.hits.hits;
        return res.status(200).json({
            err:null,
            msg:'All Tags retrieved successfully',
            data:hit.hits.hits
        });

    });
};

module.exports.getContentbyTitle =function(req, res, next) {
    client.search({
        index: 'contentelasticsearch',
        type: 'title',
        body: {
            'query': {
                'match' :{ "name":req.params.title}
            }
        }
    }).then(function (hit) {
        if(!hit) {
            console.log(err);
            return next(err);
        }
        var hits = hit.hits.hits;
        return res.status(200).json({
            err:null,
            msg:'All contents containing this title '+req.params.title + ' retrieved successfully',
            data:hit.hits.hits
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
        $or:[{tags:{$regex:new RegExp(req.params.tags)}},{name:{$regex:new RegExp(req.params.tags)}}]
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
        $or:[{tags:{$regex:new RegExp(req.params.tags)}},{type:{$regex:new RegExp(req.params.tags)}}]
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
        $or:[{tags:{$regex:new RegExp(req.params.tags)}},{type:{$regex:new RegExp(req.params.tags)}},{name:{$regex:new RegExp(req.params.tags)}}]
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

function createElasticSearchIndex() {           // to be run once for the database to create the index
    client.indices.create({
        index: 'elasticsearch'
    }, function (err, res, status) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("create", res);
        }
    })
};
function createMappingtags() {        // to be run once for the database to create the mapping
    client.indices.putMapping({
        index: 'elasticsearch',
        type: 'tags',
        body: {
            properties: {
                'name': {
                    'type': 'text', // type is a required attribute if index is specified
                    'analyzer': 'english'
                }
            }
        }
    }, function (err, resp, status) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(resp);
        }
    })
};

function createContentsearchIndex() {           // to be run once for the database to create the index
    client.indices.create({
        index: 'contentelasticsearch'
    }, function (err, res, status) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("create", res);
        }
    })
};

function createMappingtitle() {        // to be run once for the database to create the mapping
    client.indices.putMapping({
        index: 'contentelasticsearch',
        type: 'title',
        body: {
            properties: {
                'name': {
                    'type': 'text', // type is a required attribute if index is specified
                    'analyzer': 'english'
                },
            }
        }
    }, function (err, resp, status) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(resp);
        }
    })
};


function dropIndex() {                  // method to delete an index in elastic search
    return client.indices.delete({
        index: 'contentelasticsearch',
    });
}


 function deleteecord()  // to delete all documents in the an index
 {
     client.deleteByQuery({
         index: 'contentelasticsearch',  //index name
         type: 'tags',  // type name
         body: {
             'query': {
                 "match_all" : {}
             }
         }
     });
 }


   Promise.resolve()
    //    .then(createElasticSearchIndex)
    //   .then(createMappingtitle)
//  .then(deleteecord)
// .then(createContentsearchIndex)
//    .then(createMappingtitle);

