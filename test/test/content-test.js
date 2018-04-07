var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var should = chai.should();

chai.use(chaiHttp);

const adminCredentials = {
    username: 'admin', 
    password: 'helloworld',
    email:'admin@admin.com',
    firstname:'admin',
    lastname:'admin',
    admin:true

  }

  const userCredentials = {
    username: 'user', 
    password: 'helloworld',
    email:'user@user.com',
    firstname:'user',
    lastname:'user',
    admin:false
  }

  var token = '';
  var authenticatedAdmin = null;
  var authenticatedUser = null;


describe('User creation and login', function() {

    // function clearCollections() {
    //     for (var collection in mongoose.connection.collections) {
    //       mongoose.connection.collections[collection].remove(function() {});
    //     }
    //     return done();
    //   }
    before(function(done){
    var newAdmin = new User(adminCredentials);
    var newUser = new User(userCredentials);
    newAdmin.save(function(err) {
        done();
    });

    newUser.save(function(err) {
        done();
    });
});

  it('should login as admin on /api/user/login POST',function(done){
    chai.request(server)
        .post('/api/user/login')
        .send(adminCredentials)
        .end(function(err,res){
            res.should.have.status(200);
            res.body.data.should.a('string');
            token = res.body.data;
            payload = token.split('.')[1];
            payload = Buffer.from(payload,'base64');
            payload = JSON.parse(payload);
            authenticatedAdmin = payload['user'];
            done();
        });
  });

});

describe('Testing Contents',function(){
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
    it('should delete a single content as an admin');
});