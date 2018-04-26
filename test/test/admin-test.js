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
            else{
            currentadmintest =newUser ;
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
            User.create(newadmin, function(err, newUser) {
              if (err) {
               return next(err);
                  }
                  else{
                  newadmintest =newUser ;
                  console.log(newadmintest['_id']);
            console.log("hererererer");
            chai.request(server)
            .patch('/api/admin/addAdmin/'+newadmintest['_id'])
            .send({userid:currentadmintest['_id']})
            .end(function(err ,res) {
              res.status.should.be.eql(200);
              res.body.should.have.property('msg');
              res.body.msg.should.be.eql('User retrieved correctly');
              res.body.data.should.have.property('username');
              res.body.data.username.should.equal('dummyuser');
              res.body.data.should.have.property('firstname');
              res.body.data.firstname.should.equal('dummy');
              res.body.data.should.have.property('lastname');
              res.body.data.lastname.should.equal('user');
              res.body.data.should.have.property('email');
              res.body.data.email.should.equal('dummymail@guc.edu.eg');
              res.body.data.should.have.property('dateOfBirth');
              res.body.data.should.have.property('admin');
              res.body.data.admin.should.equal(true);
              done();
            });
            };

            });
            // t send request lel server w te3mel el method el 3ayezha t check


            }
      });



    }


),
it('it shouldnt register a new Admin  ' , function(done) {
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
     else{
     currentadmintest =newUser ;
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
     User.create(newadmin, function(err, newUser) {
       if (err) {
        return next(err);
           }
           else{
           newadmintest =newUser ;
           console.log(newadmintest['_id']);
     console.log("hererererer");
     chai.request(server)
     .patch('/api/admin/addAdmin/'+newadmintest['_id'])
     .send({userid:currentadmintest['_id']})
     .end(function(err ,res) {
       res.status.should.be.eql(422);
       res.body.should.have.property('msg');
       res.body.msg.should.be.eql('Unauthorized! You are not an admin.');

       done();
     });
     };

     });
     // t send request lel server w te3mel el method el 3ayezha t check


     }
});



}


)
  }
);


describe('Remove expert test' , function(){
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('it should remove the expert  ' , function(done) {
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
          else{
          currentadmintest =newUser ;
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
          User.create(newadmin, function(err, newUser) {
            if (err) {
             return next(err);
                }
                else{
                newadmintest =newUser ;
                console.log(newadmintest['_id']);
          console.log("hererererer");
          chai.request(server)
          .patch('/api/admin/removeExpert/'+newadmintest['_id'])
          .send({userid:currentadmintest['_id']})
          .end(function(err ,res) {
            res.status.should.be.eql(200);
            res.body.should.have.property('msg');
            res.body.msg.should.be.eql('User retrieved correctly');
            res.body.data.should.have.property('username');
            res.body.data.username.should.equal('dummyuser');
            res.body.data.should.have.property('firstname');
            res.body.data.firstname.should.equal('dummy');
            res.body.data.should.have.property('lastname');
            res.body.data.lastname.should.equal('user');
            res.body.data.should.have.property('email');
            res.body.data.email.should.equal('dummymail@guc.edu.eg');
            res.body.data.should.have.property('dateOfBirth');
            res.body.data.should.have.property('expert');
            res.body.data.admin.should.equal(false);
            done();
          });
          };

          });
          // t send request lel server w te3mel el method el 3ayezha t check


          }
    });



  }


),
it('it shouldnt remove the expert  ' , function(done) {
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
     else{
     currentadmintest =newUser ;
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
     User.create(newadmin, function(err, newUser) {
       if (err) {
        return next(err);
           }
           else{
           newadmintest =newUser ;
           console.log(newadmintest['_id']);
     console.log("hererererer");
     chai.request(server)
     .patch('/api/admin/removeExpert/'+newadmintest['_id'])
     .send({userid:currentadmintest['_id']})
     .end(function(err ,res) {
       res.status.should.be.eql(422);
       res.body.should.have.property('msg');
       res.body.msg.should.be.eql('Unauthorized! You are not an admin.');

       done();
     });
     };

     });
     // t send request lel server w te3mel el method el 3ayezha t check


     }
});



}


)
}
);



describe('Unblock user test' , function(){
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('it Unblock user  ' , function(done) {
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
          else{
          currentadmintest =newUser ;
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
          User.create(newadmin, function(err, newUser) {
            if (err) {
             return next(err);
                }
                else{
                newadmintest =newUser ;
                console.log(newadmintest['_id']);
          console.log("hererererer");
          chai.request(server)
          .patch('/api/admin/unBlockUser/'+newadmintest['_id'])
          .send({userid:currentadmintest['_id']})
          .end(function(err ,res) {
            res.status.should.be.eql(200);
            res.body.should.have.property('msg');
            res.body.msg.should.be.eql('User retrieved correctly');
            res.body.data.should.have.property('username');
            res.body.data.username.should.equal('dummyuser');
            res.body.data.should.have.property('firstname');
            res.body.data.firstname.should.equal('dummy');
            res.body.data.should.have.property('lastname');
            res.body.data.lastname.should.equal('user');
            res.body.data.should.have.property('email');
            res.body.data.email.should.equal('dummymail@guc.edu.eg');
            res.body.data.should.have.property('dateOfBirth');
            res.body.data.should.have.property('blocked');
            res.body.data.admin.should.equal(false);
            done();
          });
          };

          });
          // t send request lel server w te3mel el method el 3ayezha t check


          }
    });



  }


),
it('it shouldnt unblock user without user being admin  ' , function(done) {
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
     else{
     currentadmintest =newUser ;
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
     User.create(newadmin, function(err, newUser) {
       if (err) {
        return next(err);
           }
           else{
           newadmintest =newUser ;
           console.log(newadmintest['_id']);
     console.log("hererererer");
     chai.request(server)
     .patch('/api/admin/unBlockUser/'+newadmintest['_id'])
     .send({userid:currentadmintest['_id']})
     .end(function(err ,res) {
       res.status.should.be.eql(422);
       res.body.should.have.property('msg');
       res.body.msg.should.be.eql('Unauthorized! You are not an admin.');
       done();
     });
     };

     });
     // t send request lel server w te3mel el method el 3ayezha t check


     }
});



}


)
}
);
describe('Remove admin test' , function(){
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('it should remove Admin  ' , function(done) {
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
          else{
          currentadmintest =newUser ;
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
          User.create(newadmin, function(err, newUser) {
            if (err) {
             return next(err);
                }
                else{
                newadmintest =newUser ;
                console.log(newadmintest['_id']);
          console.log("hererererer");
          chai.request(server)
          .patch('/api/admin/removeAdmin/'+newadmintest['_id'])
          .send({userid:currentadmintest['_id']})
          .end(function(err ,res) {
            res.status.should.be.eql(200);
            res.body.should.have.property('msg');
            res.body.msg.should.be.eql('User retrieved correctly');
            res.body.data.should.have.property('username');
            res.body.data.username.should.equal('dummyuser');
            res.body.data.should.have.property('firstname');
            res.body.data.firstname.should.equal('dummy');
            res.body.data.should.have.property('lastname');
            res.body.data.lastname.should.equal('user');
            res.body.data.should.have.property('email');
            res.body.data.email.should.equal('dummymail@guc.edu.eg');
            res.body.data.should.have.property('dateOfBirth');
            res.body.data.should.have.property('admin');
            res.body.data.admin.should.equal(false);
            done();
          });
          };

          });
          // t send request lel server w te3mel el method el 3ayezha t check


          }
    });



  }


),
it('it shouldnt remove Admin  ' , function(done) {
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
     else{
     currentadmintest =newUser ;
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
     User.create(newadmin, function(err, newUser) {
       if (err) {
        return next(err);
           }
           else{
           newadmintest =newUser ;
           console.log(newadmintest['_id']);
     console.log("hererererer");
     chai.request(server)
     .patch('/api/admin/removeAdmin/'+newadmintest['_id'])
     .send({userid:currentadmintest['_id']})
     .end(function(err ,res) {
       res.status.should.be.eql(422);
       res.body.should.have.property('msg');
       res.body.msg.should.be.eql('Unauthorized! You are not an admin.');

       done();
     });
     };

     });
     // t send request lel server w te3mel el method el 3ayezha t check


     }
});



}


)
}
);
describe('Get user by id test' , function(){
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('it should get user  ' , function(done) {
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
          else{
          currentadmintest =newUser ;
          var newadmin  = {
            'username': 'DummyUser',
            'firstname': 'Dummy',
            'lastname': 'user',
            'email': 'Dummymail@guc.edu.eg',
            'dateOfBirth': '1997-03-03T00:00:00.000Z',

          };
          var newadmintest;
          User.create(newadmin, function(err, newUser) {
            if (err) {
             return next(err);
                }
                else{
                newadmintest =newUser ;
                console.log(newadmintest['_id']);
                console.log(currentadmintest['_id']);
          console.log("hererererer");
          chai.request(server)
          .get('/api/admin/getUserById/'+newadmintest['_id'])
          .send({userid:currentadmintest['_id']})
          .end(function(err ,res) {
            res.status.should.be.eql(200);
            res.body.should.have.property('msg');
            res.body.msg.should.be.eql('User retrieved successfully.');
            res.body.data.should.have.property('username');
            res.body.data.username.should.equal('dummyuser');
            res.body.data.should.have.property('firstname');
            res.body.data.firstname.should.equal('dummy');
            res.body.data.should.have.property('lastname');
            res.body.data.lastname.should.equal('user');
            res.body.data.should.have.property('email');
            res.body.data.email.should.equal('Dummymail@guc.edu.eg');
            res.body.data.should.have.property('dateOfBirth');

            done();
          });
          };

          });
          // t send request lel server w te3mel el method el 3ayezha t check


          }
    });



  }


)
it('it shouldnt get user  ' , function(done) {
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
     else{
     currentadmintest =newUser ;
     var newadmin  = {
       'username': 'DummyUser',
       'firstname': 'Dummy',
       'lastname': 'user',
       'email': 'Dummymail@guc.edu.eg',
       'dateOfBirth': '1997-03-03T00:00:00.000Z',
       'password':'12345678',

     };
     var newadmintest;
     User.create(newadmin, function(err, newUser) {
       if (err) {
        return next(err);
           }
           else{
           newadmintest =newUser ;
           console.log(newadmintest['_id']);
     console.log("hererererer");
     chai.request(server)
     .get('/api/admin/getUserById/'+newadmintest['_id'])
     .send({userid:currentadmintest['_id']})
     .end(function(err ,res) {
       res.status.should.be.eql(422);
       res.body.should.have.property('msg');
       res.body.msg.should.be.eql('Unauthorized! You are not an admin.');

       done();
     });
     };

     });
     // t send request lel server w te3mel el method el 3ayezha t check


     }
});



}


)
}
);
