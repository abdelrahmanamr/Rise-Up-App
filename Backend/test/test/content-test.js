var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../app');
var User = require("../../api/models/User");
var Content = require("../../api/models/Content");
var Rating = require("../../api/models/Rating");
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

  const registeringUserLoginCredentials = {
    username: 'ranon10',
    password: 'testingpassword'
  }



  var authenticatedAdmin = null;
  var authenticatedUser = null;

  var foundcontent = null;
  var content = null;
  var foundcomment = null;
  var foundrating = null;
  var token = null;





describe('Testing Contents',function(){

    before(function(done){                    // Registering a user to use in further tests before running, cant use the above hardcoded one as it doesn't test hashing
  mongoose.connect('mongodb://localhost:27017/nodejs-test');
    User.create(adminCredentials,function(err, newAdmin) {
        if (err) {
            return next(err);
          }else{
      authenticatedAdmin=newAdmin;

      const contentData = {
        title: 'testing',
            type: 'Post',
            body : 'testingcontent',
        tags: 'test',
         views: 0,

        rating:4,
        userid: authenticatedAdmin['_id'],
        };

        Content.create(contentData,function(err,newContent){
            foundcontent = newContent;
            content = newContent;
    var data = {
        username: 'ranon10',
          securityQ: 'user.secQField',
          securityA : 'user.secAField',
          password: 'testingpassword',
        confirmPassword: 'testingpassword',
        // token : '123',
          firstname: 'ranon',
          lastname: "talaat",
        tags:"result",
        email: "register6@user.com",
        dateOfBirth:"19/1/2018"
    };
        chai.request(server)
            .post('/api/user/register')
            .send(data)
            .end(function(err,res){
                res.should.have.status(201);
                User.findOne({"username":"ranon10"}).exec(function(err,userfound){
                    authenticatedUser2 = userfound;
                    done();
            });
      })
    });

    }});
    
    });
        


    

  it('should login as a user on /api/user/login POST',function(done){
      chai.request(server)
          .post('/api/user/login')
          .send(registeringUserLoginCredentials)
          .end(function(err,res){
              res.should.have.status(200);
              res.body.data.should.a('string');
              token = res.body.data;
              payload = token.split('.')[1];
              payload = Buffer.from(payload,'base64');
              payload = JSON.parse(payload);
              authenticatedUser = payload['user'];
              done();
          });
    })


    // beforeEach(function(done){
    //     // this.timeout(2500)
    //     // mongoose.connect('mongodb://localhost:27017/nodejs-test'); 
    //     var adminUser = new User(adminCredentials);
    //     var normalUser = new User(userCredentials);
    //     adminUser.save(function(err,admin){
    //         if(admin){
    //             normalUser.save(function(err,user){
    //                 if(user){
    //                     User.findOne({"username":"admin"}).exec(function(err,user1found){
    //                         authenticatedAdmin = user1found;
    //                         User.findOne({"username":"user"}).exec(function(err,userfound){
    //                             authenticatedUser = userfound;
    //                          console.log(userfound['_id'] + "  ahpwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    //                             const content = {
    //                                 title: 'testing',
    //                                   type: 'Post',
    //                                   body : 'testingcontent',
    //                                 tags: 'test',
    //                                 //  views: 5,

    //                                 rating:4,
    //                               userid: user1found['_id'],
    //                             };

    //                             chai.request(server)
    //                             .post('/api/user/login')
    //                             .send(adminCredentials)
    //                             .end(function(err,res){
    //                             token = res.body.data;
    //                             chai.request(server).post('/api/content/addContent').send(content).end(function(err,res){
    //                                 //console.log(res['data'] + " ahooowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    //                                 res.should.have.status(201);
    //                                 Content.findOne({"title":"testing"}).sort([['date', -1]]).exec(function(err,contentfound){
    //                                 foundcontent = contentfound;
    //                                 const  comment = {
    //                                     userid: userfound['_id'],
    //                                     username:userfound["username"],
    //                                       body : 'testbody',
    //                                       contentId : foundcontent['_id'],

    //                                 };

                                        
    //                                     const rating1 ={
    //                                         contentid:foundcontent['_id'],
    //                                         userid: user1found['_id'],
    //                                         rating:4,
    //                                 };
                                     
    //                                 chai.request(server).patch('/api/Content/updateContent/'+foundcontent['_id']).send(rating1).end(function(err,res){
    //                                     res.should.have.status(201);
    //                                     Rating.findOne({"rating":4}).sort([['date', -1]]).exec(function(err,ratingfound){
    //                                    foundrating = ratingfound;
                                        
    //                                         }); 
                                            
    //                                         });
    //                                 chai.request(server).post('/api/Content/createComment/'+foundcontent['_id']).send(comment).end(function(err,res){
    //                                     res.should.have.status(201);
    //                                     Comment.findOne({"body":"testbody"}).sort([['date', -1]]).exec(function(err,commentfound){
    //                                     foundcomment = commentfound;
    //                                     done();
    //                                         }); 

    //                                         });
    //                                       });
    //                                     });

    //                                     done();
    //                                 });
    //                         });
    //                     });
    //                 }
    //             });
    //         }
    //     });
    
    // });

    it('should add a single content as an admin on /api/Content/addContent POST ',function(done){
        this.timeout(10000);
        chai.request(server)
            .post('/api/content/addContent')
            .set('authorization',token)
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

    it('should list ALL comments on /api/Content/getComments GET',function(done){
        chai.request(server)
            .get('/api/Content/getComments/'+foundcontent['_id'])
            .set('authorization',token)
            .end(function(err,res){
                res.should.have.status(200);
                
                res.should.be.json;
                res.body.data.should.be.an('array');
                done();
            });
    }),
    it("should SUCCESS to edit content as an admin on /content/editContent/:contentId PATCH",function(done){
        chai.request(server).patch('/api/content/editContent/'+foundcontent['_id'])
        .set('authorization',token)
        .send({ 'body' : 'testingcontent',
        'title' : 'testing',
        'userid':authenticatedAdmin['_id'],
        'type': 'Post',
        'tags': 'test'})
        .end(function(err,res){
          res.should.have.status(200);
          res.body.msg.should.equal("content retrieved successfully.");
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.data.should.not.be.null;
          done();
        });
    }),


    
    it("should FAIL to edit content as a user on /content/editContent/:contentId PATCH",function(done){
        chai.request(server).patch('/api/content/editContent/'+foundcontent['_id'])
        .set('authorization',token)
        .send({ 'body' : 'testingcontent',
        'title' : 'testing',
        'userid':authenticatedUser['_id'],
        'type': 'Post',
        'tags': 'test'})
        .end(function(err,res){
          res.should.have.status(422);
          res.body.msg.should.equal("Unauthorized! You are not an admin.");
          res.should.be.json;
          done();
        });
    }),





    it('should list ALL comments on /api/Content/getComments GET',function(done){
        chai.request(server)
            .get('/api/Content/getComments/'+foundcontent['_id'])
            .set('authorization',token)
            .end(function(err,res){
                res.should.have.status(200);
                
                res.should.be.json;
                res.body.data.should.be.an('array');
                done();
            });
    }),

    it('should FAIL in listing all comments on /api/Content/getComments GET',function(done){
        chai.request(server)
            .get('/api/Content/getComments/'+foundcontent['_title'])
            .set('authorization',token)
            .end(function(err,res){
                res.should.have.status(422);
                res.body.msg.should.equal("contentId parameter must be a valid ObjectId.");
                res.should.be.json;
                done();
            });
    }),

    it('should create a comment as a user on /api/Content/createComment POST',function(done){
        chai.request(server)
        .post('/api/Content/createComment/'+foundcontent['_id'])
        .set('authorization',token)
        .send({
            'body' : 'testbody',
            'userid':authenticatedUser['_id'],
            'contentId' : foundcontent['_id'],
            'username': 'user'})
            .end(function(err,res){ 
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.body.should.equal('testbody');
                res.body.should.have.property('msg');
                res.body.msg.should.equal("Comment was created successfully.");
                res.body.data.should.not.be.null;
                done();
            });

        

    }), 



    it("should SUCCESS to edit content as an admin on /content/editContent/:contentId PATCH",function(done){
        chai.request(server).patch('/api/content/editContent/'+foundcontent['_id'])
        .set('authorization',token)
        .send({ 'body' : 'testingcontent',
        'title' : 'testing',
        'userid':authenticatedAdmin['_id'],
        'type': 'Post',
        'tags': 'test'})
        .end(function(err,res){
          res.should.have.status(200);
          res.body.msg.should.equal("content retrieved successfully.");
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.data.should.not.be.null;
          done();
        });
    }),


    
    it("should FAIL to edit content as a user on /content/editContent/:contentId PATCH",function(done){
        chai.request(server).patch('/api/content/editContent/'+foundcontent['_id'])
        .set('authorization',token)
        .send({ 'body' : 'testingcontent',
        'title' : 'testing',
        'userid':authenticatedUser['_id'],
        'type': 'Post',
        'tags': 'test'})
        .end(function(err,res){
          res.should.have.status(422);
          res.body.msg.should.equal("Unauthorized! You are not an admin.");
          res.should.be.json;
          done();
        });
    }),



    
    it('should FAIL to add a single content as a user on /api/Content/addContent POST ',function(done){
        chai.request(server)
            .post('/api/Content/addContent')
            .set('authorization',token)
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
            .set('authorization',token)
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
            .set('authorization',token)
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
            .set('authorization',token)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    }),
    it('should rate a content on /api/Content/updateContent/:contentId',function(done){
        Content.findOne({'title':'testing'}).exec(function(err,content){
            console.log(content+"here");
            chai.request(server)
            .patch('/api/Content/updateContent/'+content['_id'])
            .set('authorization',token)
            .send({
                'rating':foundcontent['rating'],
                'contentid':foundcontent['_id'],
                'userid':authenticatedAdmin['_id']})
            .end(function(err,res){
                console.log(res)
                console.log(err)
                res.should.have.status(201);
                res.should.be.json;
                res.body.data.rating.should.be.an('number');
                done();
            });
        });
    }),
    it('should delete a single content on /api/Content/deleteContent/:contentId',function(done){
        Content.findOne({'title':'test post'}).exec(function(err,content){
            chai.request(server)
            .delete('/api/Content/deleteContent/'+content['_id']+".."+authenticatedAdmin["_id"])
            .set('authorization',token)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    }),


    it("incrementing the views by one on /content/views/:contentId PATCH",function(done){
        chai.request(server).patch('/api/content/views/'+foundcontent['_id'])
       
        .end(function(err,res){
          res.should.have.status(200);
          res.body.msg.should.equal("content was updated successfully.");
          res.should.be.json;
          res.body.should.be.a('object');
        //   res.body.contentData.should.have.property('views');
          res.body.data.views.should.equal(1);
          done();
        });
    });

});



// after(function(done){
//     Content.collection.drop();
//     done();
// });