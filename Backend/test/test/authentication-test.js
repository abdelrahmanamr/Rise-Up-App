var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../app');
var User = require("../../api/models/User");
var Content = require("../../api/models/Content");
var should = chai.should();

dbURI = 'mongodb://localhost:27017/nodejs-test';

chai.use(chaiHttp);

const registeringUserCredentials = {
    username: 'ranon0', 
    password: 'helloworld',
    confirmPassword: 'helloworld',
    // token: '123',
    email:'user2@user.com',
    firstname:'user',
    lastname:'user',
  }

  const registeringUserLoginCredentials = {
      username: 'ranon1',
      password: 'testingpassword'
  }

  var authenticatedUser2 = null;
  var token = null;





  describe('Testing Authentication',function(){
    before(function(done){                   // Registering a user to use in further tests before running, cant use the above hardcoded one as it doesn't test hashing
    mongoose.connect('mongodb://localhost:27017/nodejs-test');
        var data = {
        username: 'ranon1',
          securityQ: 'user.secQField',
          securityA : 'user.secAField',
          password: 'testingpassword',
        confirmPassword: 'testingpassword',
        // token : '123',
          firstname: 'ranon',
          lastname: "talaat",
        tags:"result",
        email: "register1@user.com",
        dateOfBirth:"19/1/2018"
    };
    chai.request(server).post('/api/user/register').send(data).end(function(err,res){
        res.should.have.status(201);
      User.findOne({"username":"ranon1"}).exec(function(err,userfound){
          authenticatedUser2 = userfound;
          done();
          });
        });
      });



    it('should register as a user on /api/user/register POST',function(done){
        chai.request(server)
            .post('/api/user/register')
            .send(registeringUserCredentials)
            .end(function(err,res){
                res.should.have.status(201);
                done();
            });

    }),
    it('should login as a user on /api/user/login POST',function(done){
        chai.request(server)
            .post('/api/user/login')
            .send(registeringUserLoginCredentials)
            .end(function(err,res){
                // console.log(res);
                res.should.have.status(200);
                res.body.data.should.a('string');
                token = res.body.data;
                payload = token.split('.')[1];
                payload = Buffer.from(payload,'base64');
                payload = JSON.parse(payload);
                authenticatedUser = payload['user'];
                done();
            });
      }),
     it("should check for a unique username and FAIL since this user exists /api/user/checkUsername/",function(done){ // Rana Talaat
        chai.request(server)
        .post('/api/user/checkUsername')
        .send({'username':authenticatedUser2['username']})
        .end(function(err,res){
          res.should.have.status(422);
          res.body.msg.should.equal("user already exists");
          done();
        });
        
     
    }),
    it("should check for a unique username and pass since this is a new user /api/user/checkUsername/",function(done){ // Rana Talaat
        chai.request(server)
        .post('/api/user/checkUsername')
        .send({'username':'UserGedeed'})
        .end(function(err,res){
          res.should.have.status(200);
          res.body.msg.should.equal("user unique");
          done();
        });
        
     
    }),

    it('should view all users /api/User/viewUsers GET',function(done){
      // Content.find({'contentId':content['_id']}).exec(function(err,content){

      chai.request(server)
          .get('/api/User/viewUsers')
          .end(function(err,res){
              res.should.have.status(200);
              
              res.should.be.json;
           
              done();
          });
      // });
  }),


    it('should show a user on /api/User/viewUser/:userId GET',function(done){
      // Content.find({'contentId':content['_id']}).exec(function(err,content){

      chai.request(server)
          .get('/api/User/viewUser/:userId')
          .end(function(err,res){
              res.should.have.status(422);
              
              res.should.be.json;
           
              done();
          });
      // });
  }),


      it("FAIL to change a user's password as he didn't type in his new/old password or confirm it /api/user/changePassword/:userId PATCH",function(done){
          chai.request(server)
          .patch("/api/user/changePassword/"+authenticatedUser2['_id'])
          .set('authorization',token)
          .end(function(err,res){
            res.should.have.status(422);
            res.body.msg.should.equal("Wrong input data");
            done();
          });
          
       
      }),

      it("FAIL to change a user's password as a wrong old password was written /api/user/changePassword/:userId PATCH",function(done){
        chai.request(server).patch("/api/user/changePassword/"+authenticatedUser2['_id'])
        .set('authorization',token).send({oldpassword:"testingpass",newpassword:"newpassword",confirmpassword:"newpassword"}).end(function(err,res){
          res.should.have.status(422);
          res.body.msg.should.equal("Old password is wrong");
          done();
        });
    }),it("FAIL to change a user's password as a password that doesn't meet requirements was written was written /api/user/changePassword/:userId PATCH",function(done){
        chai.request(server).patch("/api/user/changePassword/"+authenticatedUser2['_id'])
        .set('authorization',token).send({oldpassword:"testingpassword",newpassword:"1234",confirmpassword:"1234"}).end(function(err,res){
          res.should.have.status(422);
          res.body.msg.should.equal("Your new password does not meet the minimum length requirement");
          done();
        });
    }),it("SUCESS to change a user's password as it meets all requirements /api/user/changePassword/:userId PATCH",function(done){
        chai.request(server).patch("/api/user/changePassword/"+authenticatedUser2['_id'])
        .set('authorization',token).send({oldpassword:"testingpassword",newpassword:"123456",confirmpassword:"123456"}).end(function(err,res){
          res.should.have.status(201);
          res.body.msg.should.equal("Success");
          done();
        });
    });

  });

