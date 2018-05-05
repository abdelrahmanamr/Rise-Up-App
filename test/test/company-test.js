var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var Company = require("../../Backend/api/models/Company");
var should = chai.should();

dbURI = 'mongodb://localhost:27017/nodejs-test';
const registeringUserLoginCredentials = {
  username: 'ranon12',
  password: 'testingpassword'
}

var authenticatedAdmin = null;
var authenticatedUser = null;
var token = null;

chai.use(chaiHttp);


describe('Testing Get Company By ID' , function() {
  before(function(done){
    mongoose.connect('mongodb://localhost:27017/nodejs-test');
    var data = {
      username: 'ranon12',
      securityQ: 'user.secQField',
      securityA : 'user.secAField',
      password: 'testingpassword',
      confirmPassword: 'testingpassword',
      firstname: 'ranon',
      lastname: "talaat",
      tags:"result",
      email: "register12@user.com",
      dateOfBirth:"19/1/2018"
    };
    chai.request(server).post('/api/user/register').send(data).end(function(err,res){
      res.should.have.status(201);
      User.findOne({"username":"ranon12"}).exec(function(err,userfound){
        authenticatedUser2 = userfound;
        done();
      });
    });
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
    });
  });

  it('Get Company :it should return error 422 when company id is not an id' , function(done) {
    this.timeout(10000);


    chai.request(server)
    .get('/api/company/getCompany/'+'notid')
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
    });
  });

  it('View Company : it should return error 422 when company id is not an id' , function(done) {
    this.timeout(10000);


    chai.request(server)
    .get('/api/Company/viewCompany/'+'notid')
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

describe('Testing Increment Views' , function() {
  it('IncrementViews : Should increment Views when correct company ID is given' , function(done) {
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
        chai.request(server)
        .patch('/api/company/CompanyViews/'+comp['_id'])
        .send()
        .set('authorization',token)
        .end(function(err ,res) {
          res.status.should.be.eql(201);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('Updated Views');
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
          res.body.data.should.have.property('views');
          res.body.data.views.should.equal(1);
          done();
        });
      });
    });
  });


  it('Increment Views :When company not found should give error 404' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .patch('/api/company/CompanyViews/'+'5ae1d95a386ecd46e7d4c89f')
    .send()
    .set('authorization',token)
    .end(function(err ,res) {
      res.status.should.be.eql(404);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('Company not found.');
      done();
    });
  });
});

describe('Testing View Companies' , function() {
  it('View Companies : should get companies correctly' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .get('/api/Company/viewCompanies')
    .send()
    .end(function(err ,res) {
      res.status.should.be.eql(200);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('Companys retrieved successfully.');
      done();
    });
  });
});

describe('Testing get Companies' , function() {
  it('Get Companies : should get companies correctly' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .get('/api/company/getCompanies')
    .send()
    .end(function(err ,res) {
      res.status.should.be.eql(200);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('Companies retrieved successfully.');
      done();
    });
  });
});

describe('Testing Create Company' , function() {
  it('Create Company : it should create company succesfully when correct attributes are given' , function(done) {
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

      chai.request(server)
      .post('/api/company/createCompany')
      .send(companytest)
      .set('authorization',token)
      .end(function(err ,res) {
        res.status.should.be.eql(201);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('Company was created successfully.');
        done();
      });
    });
  });

  it('Create Company : it should not create company when a required attribute is missing (Testing on missing company name)' , function(done) {
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
        email:'Microsoft@hotmail.com',
        website:'Microsoft.com',
        tags:'3anteel',
        type:'safa7'
      };

      chai.request(server)
      .post('/api/company/createCompany')
      .send(companytest)
      .set('authorization',token)
      .end(function(err ,res) {
        res.status.should.be.eql(422);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('name(String) , email(String) , website(String) , tags(String) and type(String) are required fields.');
        done();
      });

    });
  });
});

describe('Testing delete company' , function() {
  it('Delete Company :it should delete company when valid company id' , function(done) {
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
        chai.request(server)
        .delete('/api/company/deleteCompany/'+comp['_id'])
        .send()
        .set('authorization',token)
        .end(function(err ,res) {
          res.status.should.be.eql(200);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('Company was deleted successfully.');
          done();
        });
      });
    });
  });

  it('Delete Company :it should return 422 when not valid ID' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .delete('/api/company/deleteCompany/'+'notid')
    .send()
    .set('authorization',token)
    .end(function(err ,res) {
      res.status.should.be.eql(422);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('CompanyId parameter must be a valid ObjectId.');
      done();
    });
  });

  it('Delete Company :it should return 404 when company not found' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .delete('/api/company/deleteCompany/'+'5ae1d95a386ecd46e7d4c89f')
    .send()
    .set('authorization',token)
    .end(function(err ,res) {
      res.status.should.be.eql(404);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('Company not found.');
      done();
    });
  });
});
