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

const userCredentials = {
    username: 'user2', 
    password: 'helloworld',
    confirmPassword: 'helloworld',
    email:'user2@user.com',
    firstname:'user',
    lastname:'user',
  }

  const userLoginCredentials = {
      username: 'user2',
      password: 'helloworld'
  }

  var authenticatedUser2 = null;


  describe('Testing Authentication',function(){

    it('should register as a user on /api/user/register POST',function(done){
        chai.request(server)
            .post('/api/user/register')
            .send(userCredentials)
            .end(function(err,res){
                res.should.have.status(201);
                done();
            });

    }),
    it('should login as a user on /api/user/login POST',function(done){
        chai.request(server)
            .post('/api/user/login')
            .send(userLoginCredentials)
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
      });
  });
