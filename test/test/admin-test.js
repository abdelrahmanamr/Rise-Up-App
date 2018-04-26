var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var Content = require("../../Backend/api/models/Content");
var should = chai.should();
var contentTest = require('./content-test');
dbURI = 'mongodb://localhost:27017/nodejs-test';


chai.use(chaiHttp);

  describe('Add admin test' , function(){
    // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
    it('it should register a new Admin  ' , function(done) {
         var currentadmin  = {
        'username': 'Dummyadmin',
        'firstname': 'Dummy',
        'lastname': 'admin',
        'email': 'Dummyadminmail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'admin' :true
      };
      var currentadmintest;
      User.create(currentadmin, function(err, newUser) {
        if (err) {
         return next(err);
            }
            currentadmintest =newUser ;
      });
      var newadmin  = {
        'username': 'DummyUser',
        'firstname': 'Dummy',
        'lastname': 'user',
        'email': 'Dummymail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'admin' :false
      };
      var newadmintest;
      User.create(newadmintest, function(err, newUser) {
        if (err) {
         return next(err);
            }
            newadmintest =newUser ;
      });
      // t send request lel server w te3mel el method el 3ayezha t check
      chai.request(server)
        .patch('/api/admin/addAdmin/'+newadmintest['_id'])
        .send({userid:currentadmintest['_id']})
        .end(function(err ,res) {   
          res.status.should.be.eql(201);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('User retrieved correctly'); 
          res.body.data.should.have.property('username');
          res.body.data.username.should.equal('DummyUser');
          res.body.data.should.have.property('firstName');
          res.body.data.firstName.should.equal('Dummy');
          res.body.data.should.have.property('lastName');
          res.body.data.lastName.should.equal('user');
          res.body.data.should.have.property('email');
          res.body.data.email.should.equal('Dummymail@guc.edu.eg');
          res.body.data.should.have.property('dateOfBirth');
          res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
          res.body.data.should.have.property('admin');
          res.body.data.dob.should.equal(true);
          done();
        });
    }
    

),
it('it should register a new Admin without the user being admin ' , function(done) {
    var currentadmin  = {
      'username': 'Dummyadmin',
      'firstname': 'Dummy',
      'lastname': 'admin',
      'email': 'Dummyadminmail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' :false
    };
    var currentadmintest;
    User.create(currentadmin, function(err, newUser) {
      if (err) {
       return next(err);
          }
          currentadmintest =newUser ;
    });
    var newadmin  = {
      'username': 'DummyUser',
      'firstname': 'Dummy',
      'lastname': 'user',
      'email': 'Dummymail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' :false
    };
    var newadmintest;
    User.create(newadmintest, function(err, newUser) {
      if (err) {
       return next(err);
          }
          newadmintest =newUser ;
    });
    // t send request lel server w te3mel el method el 3ayezha t check
    chai.request(server)
      .patch('/admin/addAdmin/'+newadmintest['_id'])
      .send({userid:currentadmintest['_id']})
      .end(function(err ,res) {   
        res.status.should.be.eql(201);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('Unauthorized! You are not an admin.'); 
        res.body.data.should.have.property('username');
        res.body.data.username.should.equal('DummyUser');
        res.body.data.should.have.property('firstName');
        res.body.data.firstName.should.equal('Dummy');
        res.body.data.should.have.property('lastName');
        res.body.data.lastName.should.equal('user');
        res.body.data.should.have.property('email');
        res.body.data.email.should.equal('Dummymail@guc.edu.eg');
        res.body.data.should.have.property('dateOfBirth');
        res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
        res.body.data.should.have.property('admin');
        res.body.data.dob.should.equal(false);
        done();
      });
  }) 
  }
);
    
  
  describe('Remove expert test' , function(){
    // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
    it('it should register a new Admin  ' , function(done) {
         var currentadmin  = {
        'username': 'Dummyadmin',
        'firstname': 'Dummy',
        'lastname': 'admin',
        'email': 'Dummyadminmail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'admin' :true
      };
      var currentadmintest;
      User.create(currentadmin, function(err, newUser) {
        if (err) {
         return next(err);
            }
            currentadmintest =newUser ;
      });
      var newadmin  = {
        'username': 'DummyUser',
        'firstname': 'Dummy',
        'lastname': 'user',
        'email': 'Dummymail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'expert' :true
      };
      var newadmintest;
      User.create(newadmintest, function(err, newUser) {
        if (err) {
         return next(err);
            }
            newadmintest =newUser ;
      });
      // t send request lel server w te3mel el method el 3ayezha t check
      chai.request(server)
        .patch('/admin/removeExpert/'+newadmintest['_id'])
        .send({userid:currentadmintest['_id']})
        .end(function(err ,res) {   
          res.status.should.be.eql(201);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('User retrieved correctly'); 
          res.body.data.should.have.property('username');
          res.body.data.username.should.equal('DummyUser');
          res.body.data.should.have.property('firstName');
          res.body.data.firstName.should.equal('Dummy');
          res.body.data.should.have.property('lastName');
          res.body.data.lastName.should.equal('user');
          res.body.data.should.have.property('email');
          res.body.data.email.should.equal('Dummymail@guc.edu.eg');
          res.body.data.should.have.property('dateOfBirth');
          res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
          res.body.data.should.have.property('expert');
          res.body.data.dob.should.equal(false);
          done();
        });
    }
    

),
it('Remove expert without the user being admin ' , function(done) {
    var currentadmin  = {
      'username': 'Dummyadmin',
      'firstname': 'Dummy',
      'lastname': 'admin',
      'email': 'Dummyadminmail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' :false
    };
    var currentadmintest;
    User.create(currentadmin, function(err, newUser) {
      if (err) {
       return next(err);
          }
          currentadmintest =newUser ;
    });
    var newadmin  = {
      'username': 'DummyUser',
      'firstname': 'Dummy',
      'lastname': 'user',
      'email': 'Dummymail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'expert' :true
    };
    var newadmintest;
    User.create(newadmintest, function(err, newUser) {
      if (err) {
       return next(err);
          }
          newadmintest =newUser ;
    });
    // t send request lel server w te3mel el method el 3ayezha t check
    chai.request(server)
      .patch('/admin/removeExpert/'+newadmintest['_id'])
      .send({userid:currentadmintest['_id']})
      .end(function(err ,res) {   
        res.status.should.be.eql(201);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('Unauthorized! You are not an admin.'); 
        res.body.data.should.have.property('username');
        res.body.data.username.should.equal('DummyUser');
        res.body.data.should.have.property('firstName');
        res.body.data.firstName.should.equal('Dummy');
        res.body.data.should.have.property('lastName');
        res.body.data.lastName.should.equal('user');
        res.body.data.should.have.property('email');
        res.body.data.email.should.equal('Dummymail@guc.edu.eg');
        res.body.data.should.have.property('dateOfBirth');
        res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
        res.body.data.should.have.property('expert');
        res.body.data.dob.should.equal(true);
        done();
      });
  }) 
  });




  describe('Unblock user test' , function(){
    // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
    it('it should register a new Admin  ' , function(done) {
         var currentadmin  = {
        'username': 'Dummyadmin',
        'firstname': 'Dummy',
        'lastname': 'admin',
        'email': 'Dummyadminmail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'admin' :true
      };
      var currentadmintest;
      User.create(currentadmin, function(err, newUser) {
        if (err) {
         return next(err);
            }
            currentadmintest =newUser ;
      });
      var newadmin  = {
        'username': 'DummyUser',
        'firstname': 'Dummy',
        'lastname': 'user',
        'email': 'Dummymail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'blocked' :true
      };
      var newadmintest;
      User.create(newadmintest, function(err, newUser) {
        if (err) {
         return next(err);
            }
            newadmintest =newUser;
      });
      // t send request lel server w te3mel el method el 3ayezha t check
      chai.request(server)
        .patch('/admin/unBlockUser/'+newadmintest['_id'])
        .send({userid:currentadmintest['_id']})
        .end(function(err ,res) {   
          res.status.should.be.eql(201);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('User retrieved correctly'); 
          res.body.data.should.have.property('username');
          res.body.data.username.should.equal('DummyUser');
          res.body.data.should.have.property('firstName');
          res.body.data.firstName.should.equal('Dummy');
          res.body.data.should.have.property('lastName');
          res.body.data.lastName.should.equal('user');
          res.body.data.should.have.property('email');
          res.body.data.email.should.equal('Dummymail@guc.edu.eg');
          res.body.data.should.have.property('dateOfBirth');
          res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
          res.body.data.should.have.property('blocked');
          res.body.data.dob.should.equal(false);
          done();
        });
    }
    

),
it('Remove expert without the user being admin ' , function(done) {
    var currentadmin  = {
      'username': 'Dummyadmin',
      'firstname': 'Dummy',
      'lastname': 'admin',
      'email': 'Dummyadminmail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' :false
    };
    var currentadmintest;
    User.create(currentadmin, function(err, newUser) {
      if (err) {
       return next(err);
          }
          currentadmintest =newUser ;
    });
    var newadmin  = {
      'username': 'DummyUser',
      'firstname': 'Dummy',
      'lastname': 'user',
      'email': 'Dummymail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'blocked' :true
    };
    var newadmintest;
    User.create(newadmintest, function(err, newUser) {
      if (err) {
       return next(err);
          }
          newadmintest =newUser ;
    });
    // t send request lel server w te3mel el method 
   
    chai.request(server)
      .patch('/admin/unBlockUser/'+newadmintest['_id'])
      .send({userid:currentadmintest['_id']})
      .end(function(err ,res) {   
        res.status.should.be.eql(201);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('Unauthorized! You are not an admin.'); 
        res.body.data.should.have.property('username');
        res.body.data.username.should.equal('DummyUser');
        res.body.data.should.have.property('firstName');
        res.body.data.firstName.should.equal('Dummy');
        res.body.data.should.have.property('lastName');
        res.body.data.lastName.should.equal('user');
        res.body.data.should.have.property('email');
        res.body.data.email.should.equal('Dummymail@guc.edu.eg');
        res.body.data.should.have.property('dateOfBirth');
        res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
        res.body.data.should.have.property('blocked');
        res.body.data.dob.should.equal(true);
        done();
      });
  }) 
  });

  describe('Remove admin test' , function(){
    // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
    it('it should register a new Admin  ' , function(done) {
         var currentadmin  = {
        'username': 'Dummyadmin',
        'firstname': 'Dummy',
        'lastname': 'admin',
        'email': 'Dummyadminmail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'admin' :true
      };
      var currentadmintest;
      User.create(currentadmin, function(err, newUser) {
        if (err) {
         return next(err);
            }
            currentadmintest =newUser ;
      });
      var newadmin  = {
        'username': 'DummyUser',
        'firstname': 'Dummy',
        'lastname': 'user',
        'email': 'Dummymail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678',
        'admin' :true
      };
      var newadmintest;
      User.create(newadmintest, function(err, newUser) {
        if (err) {
         return next(err);
            }
            newadmintest =newUser ;
      });
      // t send request lel server w te3mel el method el 3ayezha t check
      chai.request(server)
        .patch('/admin/unBlockUser/'+newadmintest['_id'])
        .send({userid:currentadmintest['_id']})
        .end(function(err ,res) {   
          res.status.should.be.eql(201);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('User retrieved correctly'); 
          res.body.data.should.have.property('username');
          res.body.data.username.should.equal('DummyUser');
          res.body.data.should.have.property('firstName');
          res.body.data.firstName.should.equal('Dummy');
          res.body.data.should.have.property('lastName');
          res.body.data.lastName.should.equal('user');
          res.body.data.should.have.property('email');
          res.body.data.email.should.equal('Dummymail@guc.edu.eg');
          res.body.data.should.have.property('dateOfBirth');
          res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
          res.body.data.should.have.property('admin');
          res.body.data.dob.should.equal(false);
          done();
        });
    }
    

),
it('Remove admin  without the user being admin ' , function(done) {
    var currentadmin  = {
      'username': 'Dummyadmin',
      'firstname': 'Dummy',
      'lastname': 'admin',
      'email': 'Dummyadminmail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' :false
    };
    var currentadmintest;
    User.create(currentadmin, function(err, newUser) {
      if (err) {
       return next(err);
          }
          currentadmintest =newUser ;
    });
    var newadmin  = {
      'username': 'DummyUser',
      'firstname': 'Dummy',
      'lastname': 'user',
      'email': 'Dummymail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' :true
    };
    var newadmintest;
    User.create(newadmintest, function(err, newUser) {
      if (err) {
       return next(err);
          }
          newadmintest =newUser ;

    });
    // t send request lel server w te3mel el method el 3ayezha t check
    chai.request(server)
      .patch('/admin/removeAdmin/'+newadmintest['_id'])
      .send({userid:currentadmintest['_id']})
      .end(function(err ,res) {   
        res.status.should.be.eql(201);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('Unauthorized! You are not an admin.'); 
        res.body.data.should.have.property('username');
        res.body.data.username.should.equal('DummyUser');
        res.body.data.should.have.property('firstName');
        res.body.data.firstName.should.equal('Dummy');
        res.body.data.should.have.property('lastName');
        res.body.data.lastName.should.equal('user');
        res.body.data.should.have.property('email');
        res.body.data.email.should.equal('Dummymail@guc.edu.eg');
        res.body.data.should.have.property('dateOfBirth');
        res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
        res.body.data.should.have.property('admin');
        res.body.data.dob.should.equal(true);
        done();
      });
  }) 
  });

  describe('Get user by id test' , function() {
    // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
    it('it should register a new Admin  ' , function(done) {
      var admin  = {
        'username': 'DummyUser',
        'firstName': 'Dummy',
        'lastName': 'user',
        'email': 'Dummymail@guc.edu.eg',
        'dateOfBirth': '1997-03-03T00:00:00.000Z',
        'password':'12345678'
      };
      var testuser;
      User.create(admin, function(err, newUser) {
        if (err) {
         return next(err);
            }
                testuser =newUser ;
      });
      // t send request lel server w te3mel el method el 3ayezha t check
      chai.request(server)
        .get('/admin/getUserById/'+testuser['_id'])
        .send(admin)
        .end(function(err ,res) {   
          res.status.should.be.eql(201);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('User retrieved successfully.'); 
          res.body.data.should.have.property('username');
          res.body.data.username.should.equal('DummyUser');
          res.body.data.should.have.property('firstName');
          res.body.data.firstName.should.equal('Dummy');
          res.body.data.should.have.property('lastName');
          res.body.data.lastName.should.equal('user');
          res.body.data.should.have.property('email');
          res.body.data.email.should.equal('Dummymail@guc.edu.eg');
          res.body.data.should.have.property('dateOfBirth');
          res.body.data.dob.should.equal('1997-03-03T00:00:00.000Z');
          done();
        });
    });
  });
