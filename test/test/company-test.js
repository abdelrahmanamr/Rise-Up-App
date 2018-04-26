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


  describe('Testing Get Company By ID' , function() {
    // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
    it('get Company : it should return company by ID when correct ID is given' , function(done) {
      this.timeout(10000);
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
              usertestid = newUser['_id'];
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
                  console.log(comp['_id']);
                  chai.request(server)
                    .get('/api/company/getCompany/'+comp['_id'])
                    .send()
                    .end(function(err ,res) {
                      res.status.should.be.eql(200);
                      res.body.should.have.property('msg');
                      res.body.msg.should.be.eql('Company retrieved successfully.');
                      res.body.data.should.have.property('name');
                      res.body.data.name.should.equal('microsoft');
                      res.body.data.should.have.property('email');
                      res.body.data.email.should.equal('Microsoft@hotmail.com');
                      res.body.data.should.have.property('website');
                      res.body.data.website.should.equal('Microsoft.com');
                      res.body.data.should.have.property('tags');
                      res.body.data.tags.should.equal('3anteel');
                      res.body.data.should.have.property('type');
                      res.body.data.type.should.equal('safa7');
                      done();
                    });
              });
              // t send request lel server w te3mel el method el 3ayezha t check
            });
    });

    it('Get Company :it should return error 422 when company id is not an id' , function(done) {
      this.timeout(10000);


                  chai.request(server)
                    .get('/api/company/getCompany/'+'sad')
                    .send()
                    .end(function(err ,res) {
                      res.status.should.be.eql(422);
                      res.body.should.have.property('msg');
                      res.body.msg.should.be.eql('companyId parameter must be a valid ObjectId.');
                      done();
                    });
    });

    it('get Company :when valid id is given and company not found return 404' , function(done) {
      this.timeout(10000);
                  chai.request(server)
                    .get('/api/company/getCompany/'+'5ae1d95a386ecd46e7d4c89f')
                    .send()
                    .end(function(err ,res) {
                      res.status.should.be.eql(404);
                      res.body.should.have.property('msg');
                      res.body.msg.should.be.eql('Company not found.');
                      done();
                    });
    });
  });

  describe('Testing View Company' , function() {
    // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
    it('View Company :it should return company by ID when correct ID is given' , function(done) {
      this.timeout(10000);
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
              usertestid = newUser['_id'];
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
                  console.log(comp['_id']);
                  chai.request(server)
                    .get('/api/Company/viewCompany/'+comp['_id'])
                    .send()
                    .end(function(err ,res) {
                      res.status.should.be.eql(200);
                      res.body.should.have.property('msg');
                      res.body.msg.should.be.eql('Company retrieved successfully.');
                      res.body.data.should.have.property('name');
                      res.body.data.name.should.equal('microsoft');
                      res.body.data.should.have.property('email');
                      res.body.data.email.should.equal('Microsoft@hotmail.com');
                      res.body.data.should.have.property('website');
                      res.body.data.website.should.equal('Microsoft.com');
                      res.body.data.should.have.property('tags');
                      res.body.data.tags.should.equal('3anteel');
                      res.body.data.should.have.property('type');
                      res.body.data.type.should.equal('safa7');
                      done();
                    });
              });
              // t send request lel server w te3mel el method el 3ayezha t check
            });
    });

    it('View Company : it should return error 422 when company id is not an id' , function(done) {
      this.timeout(10000);


                  chai.request(server)
                    .get('/api/Company/viewCompany/'+'sad')
                    .send()
                    .end(function(err ,res) {
                      res.status.should.be.eql(422);
                      res.body.should.have.property('msg');
                      res.body.msg.should.be.eql('CompanyId parameter must be a valid ObjectId.');
                      done();
                    });
    });

    it('View Company :when valid id is given and company not found return 404' , function(done) {
      this.timeout(10000);
                  chai.request(server)
                    .get('/api/Company/viewCompany/'+'5ae1d95a386ecd46e7d4c89f')
                    .send()
                    .end(function(err ,res) {
                      res.status.should.be.eql(404);
                      res.body.should.have.property('msg');
                      res.body.msg.should.be.eql('Company not found.');
                      done();
                    });
    });
  });

describe('Testing Search',function(){


});
