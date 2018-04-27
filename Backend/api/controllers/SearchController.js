var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Company = mongoose.model('Company'),
    Content = mongoose.model('Content'),
    User = mongoose.model('User'),
    regex = require("regex"),
    elasticsearch = require('elasticsearch'),
    Promise = require('bluebird'),
    synonyms = require("synonyms");



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
        $or:[{tags:{$regex:new RegExp(req.params.tags)}},{title:{$regex:new RegExp(req.params.tags)}}]
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



module.exports.getSynonyms = function ( req, res,next) {
    if(!Validations.isString(req.params.keyword)) {
        return res.status(422).json({
            err: null,
            msg: ' keyword parameter must be a valid string.',
            data: null

        });
    }
    if(req.params.keyword.length>2) {
        nouns = [];
        verbs = [];
        subjects = [];
        all = [];
        nouns = synonyms(req.params.keyword, "n");
        verbs = synonyms(req.params.keyword, "v");
        subjects = synonyms(req.params.keyword, "s");
        if (!nouns && !verbs && !subjects) {
            return res.status(200).json({
                err: 'empty',
                msg: 'All synonyms of ' + req.params.keyword + ' retrieved successfully',
                data: []
            });
        }
        if (!nouns) {
            nouns = [];
        }
        if (!verbs) {
            verbs = [];
        }
        if (!subjects) {
            subjects = [];
        }
        all = nouns.concat(verbs, subjects);
        return res.status(200).json({
            err: 'found',
            msg: 'All synonyms of ' + req.params.keyword + ' retrieved successfully',
            data: all
        });
    }
    else{
        return res.status(200).json({
            err: 'empty',
            msg: 'All synonyms of ' + req.params.keyword + ' retrieved successfully',
            data: []
        });
    }

};

//---------------------------------------------------------------------Content Elastic Search-----------------------------------//
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

function createMappingContent() {        // to be run once for the database to create the mapping
    client.indices.putMapping({
        index: 'contentelasticsearch',
        type: 'contents',
        body: {
            properties: {
                'title': {
                    'type': 'text', // type is a required attribute if index is specified
                    'analyzer': 'english'
                },
                'tags': {
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
module.exports.getContentByElasticSearch =function(req, res, next) {
    client.search({
        index: 'contentelasticsearch',
        type: 'contents',
        body: {
            'query': {
                "bool": {
                    "should": [
                        { "match": { "title":  req.params.keyword }},
                        { "match": { "tags": req.params.keyword  }},
                        { "regexp": { "title": '.*'+req.params.keyword.toLowerCase()+'.*' }},
                        { "regexp": { "tags": '.*'+req.params.keyword.toLowerCase()+'.*' }}
                    ]
                }
            }
        }
    }).then(function (hit) {
        if(hit.hits.hits.length==0) {
            return res
                .status(200)
                .json({ err: null, msg: 'no content found with this keyword.', data: [] });
        }
        var hits = hit.hits.hits;
        var contents = [];
        var lastElement = hits[hits.length-1]._source['objectId'];
        var i;
        for(i = 0;i<hits.length;i++){
            var currentElement = hits[i]._source['objectId'];
            Content.findById(currentElement).exec(function(err, content) {
                if (content) {
                    contents.push(content);

                    if (content._id == lastElement) {
                        return res.status(200).json({
                            err: null,
                            msg: 'All contents tags and titles containing ' + req.params.keyword + ' retrieved successfully',
                            data: contents
                        });

                    }
                }

            });

        }

    });
};

module.exports.addToContentIndex = function (req,res,next){
    client.index({
        index:'contentelasticsearch',
        type:'contents',
        body:{
            title:req.body.title,
            tags:req.body.tags,
            objectId:req.body.objectId
        }
    });
    return res.status(200).json({
        err:null,
        msg:'Added to Content index',
        data:null
    });
}
//---------------------------------------------------------------------Company Elastic Search-----------------------------------//
function createCompanysearchIndex() {           // to be run once for the database to create the index
    client.indices.create({
        index: 'companyelasticsearch'
    }, function (err, res, status) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("create", res);
        }
    })
};
function createMappingCompany() {        // to be run once for the database to create the mapping
    client.indices.putMapping({
        index: 'companyelasticsearch',
        type: 'companies',
        body: {
            properties: {
                'name': {
                    'type': 'text', // type is a required attribute if index is specified
                    'analyzer': 'english'
                },
                'tags': {
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
module.exports.getCompanyByElasticSearch =function(req, res, next) {
    client.search({
        index: 'companyelasticsearch',
        type: 'companies',
        body: {
            'query': {
                "bool": {
                    "should": [
                        { "match": { "name":  req.params.keyword }},
                        { "match": { "tags": req.params.keyword  }},
                        { "regexp": { "name": '.*'+req.params.keyword.toLowerCase()+'.*' }},
                        { "regexp": { "tags": '.*'+req.params.keyword.toLowerCase()+'.*' }}
                    ]
                }
            }
        }
    }).then(function (hit) {
        if(hit.hits.hits.length==0) {
            return res
                .status(200)
                .json({ err: null, msg: 'no Company found with such keyword.', data: [] });
        }
        var hits = hit.hits.hits;
        var i;
        var companies =[];
        var lastElement = hits[hits.length-1]._source['objectId'];
        for(i=0;i<hits.length;i++){
            var currentElement = hits[i]._source['objectId'];
            Company.findById(hits[i]._source.objectId).exec(function(err, company) {
                if (company) {
                    companies.push(company);

                    if (company._id == lastElement) {
                        return res.status(200).json({
                            err: null,
                            msg: 'All companies tags and names containing ' + req.params.keyword + ' retrieved successfully',
                            data: companies
                        });

                    }
                }

            });
        }

    });
};
module.exports.addToCompanyIndex = function (req,res,next){
    client.index({
        index:'companyelasticsearch',
        type:'companies',
        body:{
            name:req.body.name,
            tags:req.body.tags,
            objectId:req.body.objectId
        }
    });
    return res.status(200).json({
        err:null,
        msg:'Added to Companies index',
        data:null
    });
}
//---------------------------------------------------------------------User Elastic Search-----------------------------------//
function createUsersearchIndex() {           // to be run once for the database to create the index
    client.indices.create({
        index: 'userelasticsearch'
    }, function (err, res, status) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("create", res);
        }
    })
};

function createMappingUser() {        // to be run once for the database to create the mapping
    client.indices.putMapping({
        index: 'userelasticsearch',
        type: 'users',
        body: {
            properties: {
                'username': {
                    'type': 'text', // type is a required attribute if index is specified
                    'analyzer': 'english'
                },
                'tags': {
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

module.exports.getUserByElasticSearch =function(req, res, next) {
    client.search({
        index: 'userelasticsearch',
        type: 'users',
        body: {
            'query': {
                "bool": {
                    "should": [
                        { "match": { "username":  req.params.keyword }},
                        { "match": { "tags": req.params.keyword  }},
                        { "regexp": { "username": '.*'+req.params.keyword.toLowerCase()+'.*' }},
                        { "regexp": { "tags": '.*'+req.params.keyword.toLowerCase()+'.*' }}
                    ]
                }
            }
        }
    }).then(function (hit,err) {
        console.log(hit.hits.hits.length==0);
        if(hit.hits.hits.length==0) {
            return res
                .status(200)
                .json({ err: null, msg: 'no User found with such keyword.', data: [] });
        }
        var hits = hit.hits.hits;
        var i;
        var users =[];
            var lastElement = hits[hits.length - 1]._source['objectId'];
            console.log("wasal");
            console.log(lastElement);
            for (i = 0; i < hits.length; i++) {
                var currentElement = hits[i]._source['objectId'];
                User.findById(currentElement).exec(function (err, user) {
                    if (user) {
                        users.push(user);

                        if (user._id == lastElement) {
                            return res.status(200).json({
                                err: null,
                                msg: 'All users tags and usernames containing ' + req.params.keyword + ' retrieved successfully',
                                data: users
                            });

                        }
                    }

                });
            }

    });
};

module.exports.addToUserIndex = function (req,res,next){
    client.index({
        index:'userelasticsearch',
        type:'users',
        body:{
            username:req.body.name,
            tags:req.body.tags,
            objectId:req.body.objectId
        }
    });
    return res.status(200).json({
        err:null,
        msg:'Added to User index',
        data:null
    });
}

// function addToUserIndex () {
//     client.index({
//         index: 'userelasticsearch',
//         type: 'users',
//         body: {
//             username: "abdelrahman salem",
//             tags: "sleeping,waking",
//             objectId: "5a983005fe9fa10467be1324"
//         }
//     });
//
// }
//--------------------------------------------------------------------------------------------------------------------------------//
function dropIndex() {                  // method to delete an index in elastic search
    return client.indices.delete({
        index: 'userelasticsearch',
    });
}


 function deleteRecord()  // to delete all documents in the an index
 {
     client.deleteByQuery({
         index: 'userelasticsearch',  //index name
         type: 'users',  // type name
         body: {
             'query': {
                 "match_all" : {}
             }
         }
     });
 }


   Promise.resolve()
       //.then(createCompanysearchIndex)
       //.then(createContentsearchIndex);
       //.then(createUsersearchIndex);
       //.then(createMappingCompany)
       //.then(createMappingContent)
       //.then(dropIndex);
      //.then(addToUserIndex);

       //.then(createMappingUser);
    //    .then(createElasticSearchIndex)
    //   .then(createMappingtitle)
  //.then(deleteRecord)
// .then(createContentsearchIndex)
//    .then(createMappingtitle);

