var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var Content = require("../../Backend/api/models/Content");
var Company = require("../../Backend/api/models/Company");

var should = chai.should();

dbURI = 'mongodb://localhost:27017/nodejs-test';


chai.use(chaiHttp);

const adminCredentials = {
    username: 'admin2', 
    password: '$2a$10$efAGiu0Fj1NRXtB9YgbA4uqROWUdYEBvxA2QvtWzn3QBqnYufbD8y',
    email:'admin2@admin.com',
    firstname:'admin',
    lastname:'admin',
    admin:true

  }

  const userCredentials = {
    username: 'user2', 
    password: '$2a$10$efAGiu0Fj1NRXtB9YgbA4uqROWUdYEBvxA2QvtWzn3QBqnYufbD8y',
    email:'user2@user.com',
    firstname:'user',
    lastname:'user',
    admin:false,
    expert:true,
    tags:'test'
  }


  var authenticatedAdmin = null;
  var authenticatedUser = null;

  var foundcompany = null;
  var foundcontent = null;

describe('Testing Search',function(){
beforeEach(function(done){

    var adminUser = new User(adminCredentials);
    var normalUser = new User(userCredentials);
    adminUser.save(function(err,admin){
        if(admin){
            normalUser.save(function(err,user){
                if(user){
                    User.findOne({"username":"admin2"}).exec(function(err,userfound){
                        authenticatedAdmin = userfound;
                        User.findOne({"username":"user2"}).exec(function(err,user2found){
                            authenticatedUser = user2found;
                            const  company = {
                                userid: userfound['_id'],
                                  name: 'testcompany',
                                  email : 'facebook@gmail.com',
                                  website: 'https://www.facebook.com',
                                tags: 'test',
                                 type: 'test',
                                  views: 8,
                            };
                            const content = {
                                title: 'testfortesting',
                                  type: 'Post',
                                  body : 'testing content',
                                tags: 'test',
                                 views: 5,
                              userid: userfound['_id'],
                            };

                            chai.request(server).post('/api/admin/addCompany').send(company).end(function(err,res){
                            res.should.have.status(201);
                            Company.findOne({"name":"testcompany"}).sort([['date', -1]]).exec(function(err,companyfound){
                            foundcompany = companyfound;
                                }); 
                                });
                                chai.request(server).post('/api/content/addContent').send(content).end(function(err,res){
                                res.should.have.status(201);
                                Content.findOne({"title":"testfortesting"}).sort([['date', -1]]).exec(function(err,contentfound){
                                foundcontent = contentfound;

                                     done();
                                      });
                                    });
                    
                           
                    
                           
                        });
                    });
                }
            });
        }
    });

    

    

       
});



it('should get a company by name or type on  /api/search/getCompanyByNameOrType/:name GET ',function(done){
    chai.request(server)
        .get('/api/search/getCompanyByNameOrType/'+foundcompany['name'])
        .end(function(err,res){
            res.should.have.status(200);
           res.should.be.json;
           res.body.should.be.a('object');
           res.body.data.should.not.be.null;
            done();
        });
}),

it('should get a company name on /search/getCompanyByName/ GET ',function(done){
    chai.request(server)
        .get('/api/search/getCompanyByName/'+foundcompany['name'])
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.not.be.null;
            done();
        });
}),

it('should get a company type on /search/getCompanyByType/ GET ',function(done){
    chai.request(server)
        .get('/api/search/getCompanyByType/'+foundcompany['type'])
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.not.be.null;
            done();
        });
}),

it('should get a company by tags on /search/getCompanyTags/ GET ',function(done){
    chai.request(server)
        .get('/api/search/getCompanyTags/'+foundcompany['tags'])
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.not.be.null;
            done();
        });
}),
it('should get an expert by tags on /search/getExpertTags/ GET ',function(done){
    chai.request(server)
        .get('/api/search/getExpertTags/'+authenticatedUser['tags'])
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.not.be.null;
            done();
        });
}),





it('should get a content by tags on /search/getContentTags/ GET ',function(done){
    chai.request(server)
        .get('/api/search/getContentTags/'+foundcontent['tags'])
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.not.be.null;
            done();
        });
}),

afterEach(function(done){
    Content.collection.drop();
    Company.collection.drop();
    done();
});



    
});