var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var Content = require("../../Backend/api/models/Content");
var Company = require("../../Backend/api/models/Company");
var should = chai.should();
var contentTest = require('./content-test');
var Report = require("../../Backend/api/models/Report");

dbURI = 'mongodb://localhost:27017/nodejs-test';

const registeringUserLoginCredentials = {
  username: 'ranon5',
  password: 'testingpassword'
}

var authenticatedAdmin = null;
var authenticatedUser = null;
var token = null;


chai.use(chaiHttp);

describe('Add admin test' , function(){
  before(function(done){                    // Registering a user to use in further tests before running, cant use the above hardcoded one as it doesn't test hashing
  mongoose.connect('mongodb://localhost:27017/nodejs-test');
      var data = {
      username: 'ranon5',
        securityQ: 'user.secQField',
        securityA : 'user.secAField',
        password: 'testingpassword',
      confirmPassword: 'testingpassword',
      // token : '123',
        firstname: 'ranon',
        lastname: "talaat",
      tags:"result",
      email: "registe5r@user.com",
      dateOfBirth:"19/1/2018"
  };
  chai.request(server).post('/api/user/register').send(data).end(function(err,res){
      res.should.have.status(201);
    User.findOne({"username":"ranon5"}).exec(function(err,userfound){
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
            chai.request(server)
            .patch('/api/admin/addAdmin/'+newadmintest['_id'])
            .send({userid:currentadmintest['_id']})
            .set('authorization',token)
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



  });
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
            chai.request(server)
            .patch('/api/admin/addAdmin/'+newadmintest['_id'])
            .send({userid:currentadmintest['_id']})
            .set('authorization',token)
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



  });
});
describe('Admin comment/reports functionalities',function(){
  var contentForComments = {
    title: "Content for comments",
    body:"we ady ay body ma3ana",
    tags:"love hate",
    type:"Post"
  }
  var normalCommentingUser = {
    'username': 'DummyUser',
    'firstname': 'Dummy',
    'lastname': 'user',
    'email': 'Dummymail@guc.edu.eg',
    'dateOfBirth': '1997-03-03T00:00:00.000Z',
    'password':'12345678',
    'admin' :false
  }
  var AdminUserToDeleteComments = {
    'username': 'Admin',
    'firstname': 'Admin',
    'lastname': 'Admin',
    'email': 'Dummymail@guc.edu.eg',
    'dateOfBirth': '1997-03-03T00:00:00.000Z',
    'password':'12345678',
    'admin' :true
  }
  it('admin should be able to remove comments by other people',function(done){  // Saleh

    var createdNormal;
    var createdContent;
    var createdAdmin;
    var CommentToDel;
    Content.create(contentForComments,function(err,ContentDone){
      if(err){

      }else{
        createdContent = ContentDone;
        User.create(normalCommentingUser,function(err,User1Ready){
          if(err){

          }else{
            createdNormal = User1Ready
            User.create(AdminUserToDeleteComments,function(err,AdminReady){
              if(err){
                
              }else{
                createdAdmin = AdminReady;
                Comment1 = {
                  body:"awel comment ma3ana",
                  username:createdNormal["username"],
                  userid:createdNormal["_id"],
                  contentid:createdContent["_id"],
                }
                Comment.create(Comment1,function(err,CommentReady){
                  if(err){

                  }else{
                    CommentToDel = CommentReady;
                    chai.request(server).delete("/api/Content/deleteComment/"+CommentToDel["_id"]+".."+createdAdmin["_id"])
                    .set('authorization',token).send().end(function(err,res){
                      res.status.should.be.eql(201);
                      res.body.should.have.property("msg")
                      res.body.msg.should.be.eql("Comment removed succecfully")
                      done();
                    });
                  }
                });

              }
            });
          }
        });
      }
    });
  }),
  it('admin should be able to delete his own comments',function(done){  // Saleh
    var createdNormal;
    var createdContent;
    var createdAdmin;
    var CommentToDel;
    Content.create(contentForComments,function(err,ContentDone){
      if(err){

      }else{
        createdContent = ContentDone;
        User.create(normalCommentingUser,function(err,User1Ready){
          if(err){

          }else{
            createdNormal = User1Ready
            User.create(AdminUserToDeleteComments,function(err,AdminReady){
              if(err){
                
              }else{
                createdAdmin = AdminReady;
                Comment1 = {
                  body:"tany comment ma3ana",
                  username:createdNormal["username"],
                  userid:createdAdmin["_id"],
                  contentid:createdContent["_id"],
                }
                Comment.create(Comment1,function(err,Comment2){
                  if(err){

                  }else{
                    CommentToDel = Comment2;
                    chai.request(server).delete("/api/Content/deleteComment/"+CommentToDel["_id"]+".."+createdAdmin["_id"])
                    .set('authorization',token).send().end(function(err,res){
                      res.status.should.be.eql(201);
                      res.body.should.have.property("msg")
                      res.body.msg.should.be.eql("Comment removed succecfully")
                      done();
                    });
                  }
                });
              }
            
            });
          }
        });
      }
  });
}),it('admin shouldnt  be able to delete already removed comments',function(done){ // Saleh
  var createdNormal;
  var createdContent;
  var createdAdmin;
  var CommentToDel;
  Content.create(contentForComments,function(err,ContentDone){
    if(err){

    }else{
      createdContent = ContentDone;
      User.create(normalCommentingUser,function(err,User1Ready){
        if(err){

        }else{
          createdNormal = User1Ready
          User.create(AdminUserToDeleteComments,function(err,AdminReady){
            if(err){
              
            }else{
              createdAdmin = AdminReady;
              Comment1 = {
                body:"tany comment ma3ana",
                username:createdNormal["username"],
                userid:createdAdmin["_id"],
                contentid:createdContent["_id"],
              }
              Comment.create(Comment1,function(err,Comment2){
                if(err){

                }else{
                  CommentToDel = Comment2;
                  Comment.remove({ body:"tany comment ma3ana",
                  username:createdNormal["username"],
                  userid:createdAdmin["_id"],
                  contentid:createdContent["_id"]},function(err){
                    if(err){

                    }else{
                      chai.request(server).delete("/api/Content/deleteComment/"+CommentToDel["_id"]+".."+createdAdmin["_id"])
                      .set('authorization',token).send().end(function(err,res){
                        res.status.should.be.eql(422);
                        res.body.should.have.property("msg")
                        res.body.msg.should.be.eql("Comment already removed")
                        done();
                      });
                    }
                  });

                }
              });
            }
          
          });
        }
      });
    }
});
}),it('admin should be able to view all reports',function(done){ // Saleh
  var createdNormal;
  var createdContent;
  var createdAdmin;
  var CommentToDel;
  Content.create(contentForComments,function(err,ContentDone){
    if(err){

    }else{
      createdContent = ContentDone;
      User.create(normalCommentingUser,function(err,User1Ready){
        if(err){

        }else{
          createdNormal = User1Ready
          User.create(AdminUserToDeleteComments,function(err,AdminReady){
            if(err){
              
            }else{
              createdAdmin = AdminReady;
              Comment1 = {
                body:"tany comment ma3ana",
                username:createdNormal["username"],
                userid:createdAdmin["_id"],
                contentid:createdContent["_id"],
              }
              Comment.create(Comment1,function(err,Comment2){
                if(err){

                }else{
                  CommentToDel = Comment2;
                  ReportToMake = {
                    reporterName:createdAdmin["username"],
                    reporterId:createdAdmin['_id'],
                    reportedId:createdNormal['_id'],
                    reportedName:createdNormal["username"],
                    commentId:CommentToDel['_id'],
                    commentBody:CommentToDel["body"]
                  }
                  Report.create(ReportToMake,function(err){
                    if(err){

                    }else{
                      chai.request(server).get("/api/admin/viewAllReports").set("id",createdAdmin["_id"])
                      .set('authorization',token).send().end(function(err,res){
                        res.status.should.be.eql(200);
                        res.body.should.have.property("data")
                        res.body.data.should.be.an("array")
                        done();
                      });
                    }
                  });
                    }
                  });

                }
              });
            }
          
          });
        }
      });
    }),it('Normal user shouldnt be able to view reports',function(done){ // Saleh
      var createdNormal;
      var createdContent;
      var createdAdmin;
      var CommentToDel;
      Content.create(contentForComments,function(err,ContentDone){
        if(err){
    
        }else{
          createdContent = ContentDone;
          User.create(normalCommentingUser,function(err,User1Ready){
            if(err){
    
            }else{
              createdNormal = User1Ready
              User.create(AdminUserToDeleteComments,function(err,AdminReady){
                if(err){
                  
                }else{
                  createdAdmin = AdminReady;
                  Comment1 = {
                    body:"tany comment ma3ana",
                    username:createdNormal["username"],
                    userid:createdAdmin["_id"],
                    contentid:createdContent["_id"],
                  }
                  Comment.create(Comment1,function(err,Comment2){
                    if(err){
    
                    }else{
                      CommentToDel = Comment2;
                      ReportToMake = {
                        reporterName:createdAdmin["username"],
                        reporterId:createdAdmin['_id'],
                        reportedId:createdNormal['_id'],
                        reportedName:createdNormal["username"],
                        commentId:CommentToDel['_id'],
                        commentBody:CommentToDel["body"]
                      }
                      Report.create(ReportToMake,function(err){
                        if(err){
    
                        }else{
                          chai.request(server).get("/api/admin/viewAllReports").set('id',createdNormal["_id"])
                          .set('authorization',token).send().end(function(err,res){
                            res.status.should.be.eql(422);
                            res.body.should.have.property("msg")
                            res.body.msg.should.be.eq("Admin not found.")
                            done();
                          });
                        }
                      });
                        }
                      });
    
                    }
                  });
                }
              
              });
            }
          });
        }),it("admin should be able to view all comments inside his activity tracker for the last 7 days",function(done){  // Saleh
          var createdNormal;
          var createdContent;
          var createdAdmin;
          var CommentToDel;
          Content.create(contentForComments,function(err,ContentDone){
            if(err){
        
            }else{
              createdContent = ContentDone;
              User.create(normalCommentingUser,function(err,User1Ready){
                if(err){
        
                }else{
                  createdNormal = User1Ready
                  User.create(AdminUserToDeleteComments,function(err,AdminReady){
                    if(err){
                      
                    }else{
                      createdAdmin = AdminReady;
                      Comment1 = {
                        body:"tany comment ma3ana",
                        username:createdNormal["username"],
                        userid:createdAdmin["_id"],
                        contentid:createdContent["_id"],
                      }
                      Comment.create(Comment1,function(err,Comment2){
                        if(err){
        
                        }else{
                          CommentToDel = Comment2;

                              chai.request(server).get("/api/admin/getActivityComment").set('id',createdAdmin["_id"])
                              .set('authorization',token).send().end(function(err,res){
                                res.status.should.be.eql(200);
                                res.body.should.have.property("data")
                                res.body.data.should.be.an("array")
                                done();
                              });
                            } 
                          });
                        
                            }
                          });
        
                        }
                      });
                    }
                  
                  });
                }),it("users shouldn't be able to view all website comment activity",function(done){ // Saleh
                  var createdNormal;
                  var createdContent;
                  var createdAdmin;
                  var CommentToDel;
                  Content.create(contentForComments,function(err,ContentDone){
                    if(err){
                
                    }else{
                      createdContent = ContentDone;
                      User.create(normalCommentingUser,function(err,User1Ready){
                        if(err){
                
                        }else{
                          createdNormal = User1Ready
                          User.create(AdminUserToDeleteComments,function(err,AdminReady){
                            if(err){
                              
                            }else{
                              createdAdmin = AdminReady;
                              Comment1 = {
                                body:"tany comment ma3ana",
                                username:createdNormal["username"],
                                userid:createdAdmin["_id"],
                                contentid:createdContent["_id"],
                              }
                              Comment.create(Comment1,function(err,Comment2){
                                if(err){
                
                                }else{
                                  CommentToDel = Comment2;
        
                                      chai.request(server).get("/api/admin/getActivityComment").set('id',createdNormal["_id"])
                                      .set('authorization',token).send().end(function(err,res){
                                        res.status.should.be.eql(422);
                                        res.body.should.have.property("msg")
                                        res.body.msg.should.be.eql('Not an admin')
                                        done();
                                      });
                                    } 
                                  });
                                
                                    }
                                  });
                
                                }
                              });
                            }
                          
                          });
                }),it("admin should be able to view all reports",function(done){ // Saleh
                  var createdNormal;
                  var createdContent;
                  var createdAdmin;
                  var CommentToDel;
                  Content.create(contentForComments,function(err,ContentDone){
                    if(err){
                
                    }else{
                      createdContent = ContentDone;
                      User.create(normalCommentingUser,function(err,User1Ready){
                        if(err){
                
                        }else{
                          createdNormal = User1Ready
                          User.create(AdminUserToDeleteComments,function(err,AdminReady){
                            if(err){
                              
                            }else{
                              createdAdmin = AdminReady;
                              Comment1 = {
                                body:"tany comment ma3ana",
                                username:createdNormal["username"],
                                userid:createdAdmin["_id"],
                                contentid:createdContent["_id"],
                              }
                              Comment.create(Comment1,function(err,Comment2){
                                if(err){
                
                                }else{
                                  CommentToDel = Comment2;
                                  ReportToMake = {
                                    reporterName:createdAdmin["username"],
                                    reporterId:createdAdmin['_id'],
                                    reportedId:createdNormal['_id'],
                                    reportedName:createdNormal["username"],
                                    commentId:CommentToDel['_id'],
                                    commentBody:CommentToDel["body"]
                                  }
                                  Report.create(ReportToMake,function(err){
                                    if(err){
                
                                    }else{
                                      chai.request(server).get("/api/admin/getActivityReport").set('id',createdAdmin["_id"])
                                      .set('authorization',token).send().end(function(err,res){
                                        res.status.should.be.eql(200);
                                        res.body.should.have.property("data")
                                        res.body.data.should.be.an("array")
                                        done();
                                      });
                                    }
                                  });
                                    }
                                  });
                
                                }
                              });
                            }
                          
                          });
                        }
                      });
                }),it('normal users shouldnt be able to see any reports',function(done){ // Saleh
                  var createdNormal;
                  var createdContent;
                  var createdAdmin;
                  var CommentToDel;
                  Content.create(contentForComments,function(err,ContentDone){
                    if(err){
                
                    }else{
                      createdContent = ContentDone;
                      User.create(normalCommentingUser,function(err,User1Ready){
                        if(err){
                
                        }else{
                          createdNormal = User1Ready
                          User.create(AdminUserToDeleteComments,function(err,AdminReady){
                            if(err){
                              
                            }else{
                              createdAdmin = AdminReady;
                              Comment1 = {
                                body:"tany comment ma3ana",
                                username:createdNormal["username"],
                                userid:createdAdmin["_id"],
                                contentid:createdContent["_id"],
                              }
                              Comment.create(Comment1,function(err,Comment2){
                                if(err){
                
                                }else{
                                  CommentToDel = Comment2;
                                  ReportToMake = {
                                    reporterName:createdAdmin["username"],
                                    reporterId:createdAdmin['_id'],
                                    reportedId:createdNormal['_id'],
                                    reportedName:createdNormal["username"],
                                    commentId:CommentToDel['_id'],
                                    commentBody:CommentToDel["body"]
                                  }
                                  Report.create(ReportToMake,function(err){
                                    if(err){
                
                                    }else{
                                      chai.request(server).get("/api/admin/getActivityReport").set('id',createdNormal["_id"])
                                      .set('authorization',token).send().end(function(err,res){
                                        res.status.should.be.eql(422);
                                        res.body.should.have.property("msg")
                                        res.body.msg.should.be.eq("Not an admin")
                                        done();
                                      });
                                    }
                                  });
                                    }
                                  });
                
                                }
                              });
                            }
                          
                          });
                        }
                      });
                });

});
describe('User deletes his own comments only',function(){  // Loai Testing
  var contentForComments = {
    title: "Content for comments",
    body:"we ady ay body ma3ana",
    tags:"love hate",
    type:"Post"
  }
  var normalCommentingUser = {
    'username': 'DummyUser',
    'firstname': 'Dummy',
    'lastname': 'user',
    'email': 'Dummymail@guc.edu.eg',
    'dateOfBirth': '1997-03-03T00:00:00.000Z',
    'password':'12345678',
    'admin' :false
  }
  var AdminUserToDeleteComments = {
    'username': 'Admin',
    'firstname': 'Admin',
    'lastname': 'Admin',
    'email': 'Dummymail@guc.edu.eg',
    'dateOfBirth': '1997-03-03T00:00:00.000Z',
    'password':'12345678',
    'admin' :true
  }
  it("user should be able to delete his own comment",function(done){
    var createdNormal;
    var createdContent;
    var createdAdmin;
    var CommentToDel;
    Content.create(contentForComments,function(err,ContentDone){
      if(err){

      }else{
        createdContent = ContentDone;
        User.create(normalCommentingUser,function(err,User1Ready){
          if(err){

          }else{
            createdNormal = User1Ready
            User.create(AdminUserToDeleteComments,function(err,AdminReady){
              if(err){
                
              }else{
                createdAdmin = AdminReady;
                Comment1 = {
                  body:"awel comment ma3ana",
                  username:createdNormal["username"],
                  userid:createdNormal["_id"],
                  contentid:createdContent["_id"],
                }
                Comment.create(Comment1,function(err,CommentReady){
                  if(err){

                  }else{
                    CommentToDel = CommentReady;
                    chai.request(server).delete("/api/Content/deleteComment/"+CommentToDel["_id"]+".."+createdNormal["_id"])
                    .set('authorization',token).send().end(function(err,res){
                      res.status.should.be.eql(201);
                      res.body.should.have.property("msg")
                      res.body.msg.should.be.eql("Done")
                      done();
                    });
                  }
                });

              }
            });
          }
        });
      }
    });
  }),it("user shouldn't be able to delete another user's comment since he is not an admin",function(done){
    var createdNormal;
    var createdContent;
    var createdAdmin;
    var CommentToDel;
    Content.create(contentForComments,function(err,ContentDone){
      if(err){

      }else{
        createdContent = ContentDone;
        User.create(normalCommentingUser,function(err,User1Ready){
          if(err){

          }else{
            createdNormal = User1Ready
            User.create(AdminUserToDeleteComments,function(err,AdminReady){
              if(err){
                
              }else{
                createdAdmin = AdminReady;
                Comment1 = {
                  body:"awel comment ma3ana",
                  username:createdAdmin["username"],
                  userid:createdAdmin["_id"],
                  contentid:createdContent["_id"],
                }
                Comment.create(Comment1,function(err,CommentReady){
                  if(err){

                  }else{
                    CommentToDel = CommentReady;
                    chai.request(server).delete("/api/Content/deleteComment/"+CommentToDel["_id"]+".."+createdNormal["_id"])
                    .set('authorization',token).send().end(function(err,res){
                      res.status.should.be.eql(422);
                      res.body.should.have.property("msg")
                      res.body.msg.should.be.eql("This user didn't comment on this post")
                      done();
                    });
                  }
                });

              }
            });
          }
        });
      }
    });
  });
});


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
            chai.request(server)
            .patch('/api/admin/removeExpert/'+newadmintest['_id'])
            .send({userid:currentadmintest['_id']})
            .set('authorization',token)
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
              res.body.data.expert.should.equal(false);
              done();
            });
          };

        });
        // t send request lel server w te3mel el method el 3ayezha t check


      }
    });


  });
});
describe('Add Expert test' , function(){
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('it should register a new Expert  ' , function(done) {
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
        var newexpert  = {
          'username': 'DummyUser',
          'firstname': 'Dummy',
          'lastname': 'user',
          'email': 'Dummymail@guc.edu.eg',
          'dateOfBirth': '1997-03-03T00:00:00.000Z',
          'password':'12345678',
          'expert' :false
        };
        var newexperttest;
        User.create(newexpert, function(err, newUser) {
          if (err) {
            return next(err);
          }
          else{
            newexperttest =newUser ;
            chai.request(server)
            .patch('/api/admin/addExpert/'+newexperttest['_id'])
            .send({userid:currentadmintest['_id']})
            .set('authorization',token)
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
              res.body.data.expert.should.equal(true);
              done();
            });
          };

        });

      }
    });



  }


),
it('it shouldnt register a new Expert without the user being admin ' , function(done) {
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
  var newexpert  = {
    'username': 'DummyUser',
    'firstname': 'Dummy',
    'lastname': 'user',
    'email': 'Dummymail@guc.edu.eg',
    'dateOfBirth': '1997-03-03T00:00:00.000Z',
    'password':'12345678',
    'expert' :false
  };
  var newexperttest;
  User.create(newexpert, function(err, newUser) {
    if (err) {
      return next(err);
    }
    newexperttest =newUser ;

    // t send request lel server w te3mel el method el 3ayezha t check
    chai.request(server)
    .patch('/api/admin/addExpert/'+newexperttest['_id'])
    .send({userid:currentadmintest['_id']})
    .set('authorization',token)
    .end(function(err ,res) {
      res.status.should.be.eql(422);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('Unauthorized! You are not an admin.');
      done();
    });
  });
});
});


describe('Get Tags test' , function() {
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('it should get tags of user ' , function(done) {
    var admin  = {
      'username': 'Dummyadmin',
      'firstname': 'Dummy',
      'lastname': 'admin',
      'email': 'Dummyadminmail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' : true
    };
    var testuser;
    User.create(admin, function(err, newUser) {
      if (err) {
        return next(err);
      }
      testuser =newUser ;

      // t send request lel server w te3mel el method el 3ayezha t check
      chai.request(server)
      .get('/api/admin/getUserTags/'+testuser['_id'])
      .set('authorization',token)
      .end(function(err ,res) {
        res.status.should.be.eql(200);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('User retrieved successfully.');
        done();
      });
    });
  });
});


describe('Update Expert Tag test' , function() {

  it('it should update expert tags  ' , function(done) {
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
        newadmintest =newUser ;

      chai.request(server)
      .patch('/api/admin/UpdateExpertTag/'+newadmintest['_id'])
      .send({tags:'ay kalam',userid:currentadmintest['_id']})
      .set('authorization',token)
      .end(function(err ,res) {
        res.status.should.be.eql(200);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('User retrieved correctly');
        done();
      });
    });
  });
});
});
describe('Get Users test' , function() {
  it('Get Users : should get users correctly' , function(done) {
    this.timeout(10000);
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

      chai.request(server)
      .get('/api/admin/getUsers')
      .set('id', currentadmintest['_id'])
      .set('authorization',token)
      .end(function(err ,res) {
        res.status.should.be.eql(200);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('Users retrieved successfully.');
        done();
      });
    });
  });
});

describe('Remove expert test' , function(){
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('it should remove expert  ' , function(done) {
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
        newadmintest =newUser ;

        // t send request lel server w te3mel el method el 3ayezha t check
        chai.request(server)
        .patch('/api/admin/removeExpert/'+newadmintest['_id'])
        .send({userid:currentadmintest['_id']})
        .set('authorization',token)
        .end(function(err ,res) {
          res.status.should.be.eql(200);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('User retrieved correctly');
          done();
        });
      });
    });});
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
              chai.request(server)
              .patch('/api/admin/removeExpert/'+newadmintest['_id'])
              .send({userid:currentadmintest['_id']})
              .set('authorization',token)
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



    });
  });



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
              chai.request(server)
              .patch('/api/admin/unBlockUser/'+newadmintest['_id'])
              .send({userid:currentadmintest['_id']})
              .set('authorization',token)
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
            chai.request(server)
            .patch('/api/admin/unBlockUser/'+newadmintest['_id'])
            .send({userid:currentadmintest['_id']})
            .set('authorization',token)
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



  });
});
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
            chai.request(server)
            .patch('/api/admin/removeAdmin/'+newadmintest['_id'])
            .send({userid:currentadmintest['_id']})
            .set('authorization',token)
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
          chai.request(server)
          .patch('/api/admin/removeAdmin/'+newadmintest['_id'])
          .send({userid:currentadmintest['_id']})
          .set('authorization',token)
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



});
});
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
        newadmintest =newUser ;
        chai.request(server)
        .get('/api/admin/getUserById/'+newadmintest['_id'])
        .set('id', currentadmintest['_id'])
        .set('authorization',token)
        .end(function(err ,res) {
          res.status.should.be.eql(200);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('User retrieved successfully.');
          done();
        });

      });



    });



  });
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
        User.create(newadmin, function(err, newUser2) {
          if (err) {
            return next(err);
          }
          else{
            newadmintest =newUser2 ;
            chai.request(server)
            .get('/api/admin/getUserById/'+newadmintest['_id'])
            .set('id', currentadmintest['_id'])
            .set('authorization',token)
            .end(function(err ,res) {
              res.status.should.be.eql(422);
              res.body.should.have.property('msg');
              res.body.msg.should.be.eql('Unauthorized! You are not an admin.');

              done();
            });
          };

        });
      }
    });
  });
});
describe('Testing View Companies' , function() {
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('View Companies : should get companies correctly' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .get('/api/admin/viewCompanies')
    .send()
    .set('authorization',token)
    .end(function(err ,res) {
      res.status.should.be.eql(200);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('Companies retrieved successfully.');
      done();
    });
  });
});

describe('Testing get Companies' , function() {
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('Get Companies : should get companies correctly' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .get('/api/admin/getCompanies')
    .set('authorization',token)
    .send()
    .end(function(err ,res) {
      res.status.should.be.eql(200);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('Companies retrieved successfully.');
      done();
    });
  });
});


describe('Testing delete company' , function() {
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
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
        tags:'tech',
        type:'international'
      };
      var comp;
      Company.create(companytest, function(err, company) {
        if (err) {
          return next(err);
        }
        comp = company;
        chai.request(server)
        .delete('/api/admin/removeCompany/'+comp['_id'])
        .send()
        .set('authorization',token)
        .end(function(err ,res) {
          res.status.should.be.eql(200);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('Company was deleted successfully.');
          done();
        });
      });
      // t send request lel server w te3mel el method el 3ayezha t check
    });
  });

  it('Delete Company :it should return 422 when not valid ID' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .delete('/api/admin/removeCompany/'+'notid')
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
    .delete('/api/admin/removeCompany/'+'5ae1d95a386ecd46e7d4c89f')
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

describe('Testing get Companies' , function() {
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('Get Companies : should get companies correctly' , function(done) {
    this.timeout(10000);
    chai.request(server)
    .get('/api/admin/getCompanies')
    .set('authorization',token)
    .send()
    .end(function(err ,res) {
      res.status.should.be.eql(200);
      res.body.should.have.property('msg');
      res.body.msg.should.be.eql('Companies retrieved successfully.');
      done();
    });
  });
});

describe('Block user test' , function(){
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('it Blocks user  ' , function(done) {
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
            chai.request(server)
            .patch('/api/admin/BlockUser/'+newadmintest['_id'])
            .set('id', currentadmintest['_id'])
            .set('authorization',token)
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
              res.body.data.blocked.should.equal(true);
              done();
            });
          };

        });
        // t send request lel server w te3mel el method el 3ayezha t check


      }
    });



  }


),
it('it shouldnt block user without user being admin  ' , function(done) {
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
        'blocked' :false
      };
      var newadmintest;
      User.create(newadmin, function(err, newUser) {
        if (err) {
          return next(err);
        }
        else{
          newadmintest =newUser ;
          chai.request(server)
          .patch('/api/admin/BlockUser/'+newadmintest['_id'])
          .set('id', currentadmintest['_id'])
          .set('authorization',token)
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


describe('Testing Adding a Company' , function() {
  // el it de goz2 ml test momken yekoon fe kaza it heya 3obara 3an goz2 ml test bos el ta7t de example
  it('Add Company : it should add a company succesfully when correct attributes are given' , function(done) {
    this.timeout(100000);
    var admintestid;
    var admintest  = {
      'username': 'DummyUser',
      'firstname': 'Dummy',
      'lastname': 'User',
      'email': 'Dummymail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' :'true'
    };
    User.create(admintest, function(err, newUser) {
      if (err) {
        return next(err);
      }
      admintestid = newUser['_id'];
      var companytest ={
        userid: admintestid,
        name :'Microsoft',
        email:'Microsoft@hotmail.com',
        website:'Microsoft.com',
        tags:'tech',
        type:'international'
      };

      chai.request(server)
      .post('/api/admin/addCompany')
      .send(companytest)
      .set('authorization',token)
      .end(function(err ,res) {
        res.status.should.be.eql(201);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('Company was created successfully.');
        done();
      });

      // t send request lel server w te3mel el method el 3ayezha t check
    });
  });

  it('Added Company : it should not add company when a required attribute is missing (Testing on missing company name)' , function(done) {
    this.timeout(10000);
    var admintestid;
    var admintest  = {
      'username': 'DummyUser',
      'firstname': 'Dummy',
      'lastname': 'User',
      'email': 'Dummymail@guc.edu.eg',
      'dateOfBirth': '1997-03-03T00:00:00.000Z',
      'password':'12345678',
      'admin' :'true'
    };
    User.create(admintest, function(err, newUser) {
      if (err) {
        return next(err);
      }
      admintestid = newUser['_id'];
      var companytest ={
        userid: admintestid,
        email:'Microsoft@hotmail.com',
        website:'Microsoft.com',
        tags:'tech',
        type:'international'
      };

      chai.request(server)
      .post('/api/admin/addCompany')
      .send(companytest)
      .set('authorization',token)
      .end(function(err ,res) {
        res.status.should.be.eql(422);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('name(String) , email(String) , website(String) , tags(String) and type(String) are required fields.');
        done();
      });

      // t send request lel server w te3mel el method el 3ayezha t check
    });
  });
});