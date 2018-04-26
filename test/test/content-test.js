var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var Content = require("../../Backend/api/models/Content");
var should = chai.should();

dbURI = 'mongodb://localhost:27017/nodejs-test';


chai.use(chaiHttp);

const adminCredentials = {
    username: 'admin', 
    password: '$2a$10$efAGiu0Fj1NRXtB9YgbA4uqROWUdYEBvxA2QvtWzn3QBqnYufbD8y',
    email:'admin@admin.com',
    firstname:'admin',
    lastname:'admin',
    admin:true

  }

  const userCredentials = {
    username: 'user', 
    password: '$2a$10$efAGiu0Fj1NRXtB9YgbA4uqROWUdYEBvxA2QvtWzn3QBqnYufbD8y',
    email:'user@user.com',
    firstname:'user',
    lastname:'user',
    admin:false
  }

  var authenticatedAdmin = null;
  var authenticatedUser = null;

  var foundcontent = null;
  var foundcomment = null;






describe('Testing Contents',function(){
    beforeEach(function(done){
        mongoose.connect('mongodb://localhost:27017/nodejs-test'); 
        var adminUser = new User(adminCredentials);
        var normalUser = new User(userCredentials);
        adminUser.save(function(err,admin){
            if(admin){
                normalUser.save(function(err,user){
                    if(user){
                        User.findOne({"username":"admin"}).exec(function(err,user1found){
                            authenticatedAdmin = user1found;
                            User.findOne({"username":"user"}).exec(function(err,userfound){
                                authenticatedUser = userfound;
                             console.log(userfound['_id'] + "  ahpwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
                                const content = {
                                    title: 'testing',
                                      type: 'Post',
                                      body : 'testingcontent',
                                    tags: 'test',
                                    //  views: 5,
                                  userid: user1found['_id'],
                                };
                                
                                chai.request(server).post('/api/content/addContent').send(content).end(function(err,res){
                                    //console.log(res['data'] + " ahooowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
                                    res.should.have.status(201);
                                    Content.findOne({"title":"testing"}).sort([['date', -1]]).exec(function(err,contentfound){
                                    foundcontent = contentfound;
                                          });
                                        });

                                        console.log(foundcontent + "ahoooooooooooooowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
                                const  comment = {
                                    userid: userfound['_id'],
                                      body : 'testbody',
                                      contentId : foundcontent['_id'],
                                };

                                chai.request(server).post('/api/Content/createComment').send(comment).end(function(err,res){
                                    res.should.have.status(201);
                                    Comment.findOne({"body":"testbody"}).sort([['date', -1]]).exec(function(err,commentfound){
                                    foundcomment = commentfound;
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





    it('should list ALL comments on /api/Content/getComments GET',function(done){
        // Content.find({'contentId':content['_id']}).exec(function(err,content){
console.log(foundcontent + " " + "ahooooooooooooooooooooooooooooooooooooooooooooooooooo");
        chai.request(server)
            .get('/api/Content/getComments/'+foundcontent['_id'])
            .end(function(err,res){
                res.should.have.status(200);
                
                res.should.be.json;
                res.body.data.should.be.an('array');
                done();
            });
        // });
    }),

    it('should add a single content as an admin on /api/Content/addContent POST ',function(done){
        chai.request(server)
            .post('/api/Content/addContent')
            .send({
                'title':'test post',
                'type':'Post',
                'tags':'test',
                'body':'this is a test post',
                'userid':authenticatedAdmin['_id']})
            .end(function(err,res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.not.be.null;
                done();
            });
    }),
    it('should FAIL to add a single content as a user on /api/Content/addContent POST ',function(done){
        chai.request(server)
            .post('/api/Content/addContent')
            .send({
                'title':'test post',
                'type':'Post',
                'tags':'test',
                'body':'this is a test post',
                'userid':authenticatedUser['_id']})
            .end(function(err,res){
                res.should.have.status(422);
                res.should.be.json;
                done();
            });
    }),
    it('should FAIL to add a single content as a visitor on /api/Content/addContent POST ',function(done){
        chai.request(server)
            .post('/api/Content/addContent')
            .send({
                'title':'test post',
                'type':'Post',
                'tags':'test',
                'body':'this is a test post'})
            .end(function(err,res){
                res.should.have.status(422);
                res.should.be.json;
                done();
            });
    }),
    it('should list ALL contents on /api/Content/viewContents GET',function(done){
        chai.request(server)
            .get('/api/Content/viewContents')
            .end(function(err,res){
                res.should.have.status(200);
                
                res.should.be.json;
                res.body.data.should.be.an('array');
                done();
            });
    }),
    it('should list a specific content on /api/Content/viewContent GET',function(done){
        Content.findOne({'title':'test post'}).exec(function(err,content){
            chai.request(server)
            .get('/api/Content/viewContent/'+content['_id'])
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    }),
    it('should delete a single content on /api/Content/deleteContent/:contentId',function(done){
        Content.findOne({'title':'test post'}).exec(function(err,content){
            chai.request(server)
            .delete('/api/Content/deleteContent/'+content['_id']+".."+authenticatedAdmin["_id"])
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });
    afterEach(function(done){
        User.collection.drop();
        Comment.collection.drop();
        done();
    });
});



after(function(done){
    Content.collection.drop();
    done();
});