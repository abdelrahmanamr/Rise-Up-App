var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var Company = require("../../Backend/api/models/Company");
var should = chai.should();

dbURI = 'mongodb://localhost:27017/nodejs-test';


chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

let base = undefined;
if (!process.env.PWD) {
  base = process.cwd();
}else{
  base = process.env.PWD;
}
var mongoose = require('mongoose'),
  Admin = mongoose.model('Admin'),
  should = require('should'),
  chai = require('chai'),
  chaiHTTP = require('chai-http'),
  server = require(base +'/app'),
  Teacher = mongoose.model('Teacher');
chai.use(chaiHTTP);



process.env.NODE_ENV = 'test';

let base = undefined;
if (!process.env.PWD) {
  base = process.cwd();
}else{
  base = process.env.PWD;
}
var mongoose = require('mongoose'),
  Admin = mongoose.model('Admin'),
  should = require('should'),
  chai = require('chai'),
  chaiHTTP = require('chai-http'),
  server = require(base +'/app'),
  Teacher = mongoose.model('Teacher');
chai.use(chaiHTTP);



describe('testing Authentication Functions' , function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost:27017/nodejs-nawwar-test' , function() {
      console.log('Connected to TestDb');
      done();
    });
  });


  describe('Testing Get Company By ID' , function() {
    // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
    it('it should return company by ID when correct ID is given' , function(done) {
      var usertestid;
      var usertest  = {
        'username': 'DummyUser',
        'firstname': 'Dummy',
        'lastname': 'User',
        'email': 'Dummymail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'admin' :'true'
      };
      User.create(usertest, function(err, newUser) {
            if (err) {
             return next(err);
                }
              usertestid = newUser._id;
    });
      var companytest ={
        userid: usertestid,
        name :'Microsoft',
        email:'Microsoft@hotmail.com',
        website:'Microsoft.com',
        tags:'3anteel',
        type:'safa7'
      };
      var comp;
      Company.create(companytest, function(err, company) {
          if (err) {
              return next(err);
          }
          comp = company;
      });
      // t send request lel server w te3mel el method el 3ayezha t check
      chai.request(server)
        .get('/api/company/getCompany/'+comp._id)
        .send()
        .end(function(err ,res) {
          res.status.should.be.eql(201);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('Registration successful, you can now login to your account.');
          res.body.data.should.have.property('username');
          res.body.data.username.should.equal('DummyUser');
          res.body.data.should.have.property('firstName');
          res.body.data.firstName.should.equal('Dummy');
          res.body.data.should.have.property('lastName');
          res.body.data.lastName.should.equal('user');
          res.body.data.should.have.property('email');
          res.body.data.email.should.equal('Dummymail@guc.edu.eg');
          res.body.data.should.have.property('dob');
          res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
          done();
        });
    });
  });



describe('Testing Search',function(){


});
