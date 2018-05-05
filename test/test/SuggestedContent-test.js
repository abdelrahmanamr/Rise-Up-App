var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var SuggestedContent = require("../../Backend/api/models/SuggestedContent");

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
    username: 'ranon2',
    password: 'testingpassword'
  }

  var authenticatedAdmin = null;
  var authenticatedUser = null;
  var token = null;




describe('Testing SuggestedContent', () => 
{
    before(function(done){                   // Registering a user to use in further tests before running, cant use the above hardcoded one as it doesn't test hashing
  mongoose.connect('mongodb://localhost:27017/nodejs-test');
      var data = {
      username: 'ranon2',
        securityQ: 'user.secQField',
        securityA : 'user.secAField',
        password: 'testingpassword',
      confirmPassword: 'testingpassword',

        firstname: 'ranon',
        lastname: "talaat",
      tags:"result",
      email: "register@user.com",
      dateOfBirth:"19/1/2018"
  };
  chai.request(server).post('/api/user/register').send(data).end(function(err,res){
      res.should.have.status(201);
    User.findOne({"username":"ranon123123"}).exec(function(err,userfound){
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


    before(function(done){
        mongoose.connect('mongodb://localhost:27017/nodejs-test'); 
        var adminUser = new User(adminCredentials);
        var normalUser = new User(userCredentials);
        adminUser.save(function(err,admin){
            if(admin){
                normalUser.save(function(err,user){
                    if(user){
                        User.findOne({"username":"admin"}).exec(function(err,userfound){
                            authenticatedAdmin = userfound;
                            User.findOne({"username":"user"}).exec(function(err,userfound){
                                authenticatedUser = userfound;
                                done();
                            });
                        });
                    }
                });
            }
        });
    
    });

    describe('GET /api/suggestedContent/viewSuggestedContents', () => {
    it('should retrieve all the content successfully on /api/suggestedContent/viewSuggestedContents GET', (done) => {
    chai.request(server)
    .get('/api/suggestedContent/viewSuggestedContents')
    .set('authorization',token)
    .end((err, res) => {
    res.should.have.status(200);
    res.body.msg.should.equal("contents retrieved successfully.");
    done();
    });});});

    describe('/GET/:id /api/suggestedContent/viewSuggestedContent', () => {
    it('it should GET a suggestedContent by the given id' , (done) => {
        let suggestedContentTest = 
        new SuggestedContent({ 
        title:'testingContent',
        body:'This content is made to test the content controller',
        tags:'testTag' });
        suggestedContentTest.save((err, suggestedContentTest) => {
        chai.request(server).get('/api/suggestedContent/viewSuggestedContent/' + suggestedContentTest.id)
        .set('authorization',token)
        .send(suggestedContentTest).end((err, res) => 
        {
            res.should.have.status(200); 
            res.body.data.should.have.property('title'); 
            res.body.data.should.have.property('body'); 
            res.body.data.should.have.property('tags'); 
            res.body.msg.should.equal("content retrieved successfully.");
            res.body.data.should.have.property('_id').eql(suggestedContentTest.id);
            done(); });
    });});});
    describe('/GET/:id /api/suggestedContent/viewSuggestedContent', () => {
        it('it should fail to GET a suggestedContent by the given invalid id' , (done) => {
            let suggestedContentTest = 
            new SuggestedContent({ 
            title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag' });
            suggestedContentTest.save((err, suggestedContentTest) => {
            chai.request(server).get('/api/suggestedContent/viewSuggestedContent/' + '123')
            .set('authorization',token)
            .send(suggestedContentTest).end((err, res) => 
            {
                res.should.have.status(422); 
                res.body.msg.should.equal("contentId parameter must be a valid ObjectId.");
                done(); });
        });});});
   
    it('it should POST SuggestedContent ', (done) => 
    {
        let newUser = 
        new User({ 
        firstname:'mohamed',
        lastname:'ashraf',
        username:'Mash',
        password:'abcde',
        email:'mohamed@gmail.com'});

        let suggestedContentTest = 
        {
            title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag',
            userid:authenticatedUser['_id']
        };

        chai.request(server).post('/api/suggestedContent/addSuggestedContent')
        .send(suggestedContentTest)
        .set('authorization',token)
        .end((err, res) => 
        { res.should.have.status(201);
        res.body.should.have.property('msg').eql('Suggested Content was created successfully.' ); 
        done();
    });});
    it('it should fail to POST SuggestedContent with no user id', (done) => 
    {
        let suggestedContentTest = 
        {
            title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag',
        };

        chai.request(server).post('/api/suggestedContent/addSuggestedContent')
        .send(suggestedContentTest)
        .set('authorization',token)
        .end((err, res) => 
        { res.should.have.status(422);
        res.body.should.have.property('msg').eql('test' ); 
        done();
    });});





    it('it should fail to POST SuggestedContent with no body', (done) => 
    {
        let suggestedContentTest = 
        {
            title:'testingContent',
            tags:'testTag',
        };

        chai.request(server).post('/api/suggestedContent/addSuggestedContent')
        .send(suggestedContentTest)
        .set('authorization',token)
        .end((err, res) => 
        { res.should.have.status(422);
        res.body.should.have.property('msg').eql('test' ); 
        done();
    });});
    it('it should fail to POST SuggestedContent with no title', (done) => 
    {
        let suggestedContentTest = 
        {
            body:'This content is made to test the content controller',
            tags:'testTag',
        };

        chai.request(server).post('/api/suggestedContent/addSuggestedContent')
        .send(suggestedContentTest)
        .set('authorization',token)
        .end((err, res) => 
        { res.should.have.status(422);
        res.body.should.have.property('msg').eql('test' ); 
        done();
    });});
    it('it should fail to POST SuggestedContent with no tags', (done) => 
    {
        let suggestedContentTest = 
        {
            title:'testingContent',
            body:'This content is made to test the content controller',
        };

        chai.request(server).post('/api/suggestedContent/addSuggestedContent')
        .send(suggestedContentTest)
        .set('authorization',token)
        .end((err, res) => 
        { res.should.have.status(422);
        res.body.should.have.property('msg').eql('test' ); 
        done();
    });});
   
    describe('DELETE/:id /api/suggestedContent/deleteSuggestedContent', () => {
    it('it should DELETE a suggestedContent given the id' , (done) => {
        let suggestedContentTest = new SuggestedContent(
        {
            title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag'
        })
        suggestedContentTest.save((err, suggestedContentTest) => { chai.request(server)
        .delete('/api/suggestedContent/deleteSuggestedContent/' + suggestedContentTest.id) 
        .set('authorization',token)
        .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('msg').eql('Content was deleted successfully.'); 
    done();});});});
    it('it should fail DELETE a suggestedContent given invalid content id' , (done) => {
        let suggestedContentTest = new SuggestedContent(
        {
            title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag'
        })
        suggestedContentTest.save((err, suggestedContentTest) => { chai.request(server)
        .delete('/api/suggestedContent/deleteSuggestedContent/' + '123') 
        .set('authorization',token)
        .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('msg').eql('ContentId parameter must be a valid ObjectId.'); 
    done();});});});});

   describe('/PATCH/:id /api/suggestedContent/updateSuggestedContent', () => {
   it('it should UPDATE a suggestedContent given the id' , (done) => {
    let suggestedContentTest = new SuggestedContent
    ({title:'testingContent',
    body:'This content is made to test the content controller',
    tags:'testTag'})
    suggestedContentTest.save((err, suggestedContentTest) => { chai.request(server).patch('/api/suggestedContent/updateSuggestedContent/' + suggestedContentTest.id)
    .set('authorization',token)
    .send(
        {   title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag',}
        ).end((err, res) => {
    res.should.have.status(200);
    res.body.should.have.property('msg').eql('Content was updated successfully.'); 
    done();});});});
    it('it should fail to UPDATE a suggestedContent given invalid id' , (done) => {
        let suggestedContentTest = new SuggestedContent
        ({title:'testingContent',
        body:'This content is made to test the content controller',
        tags:'testTag'})
        suggestedContentTest.save((err, suggestedContentTest) => { chai.request(server).patch('/api/suggestedContent/updateSuggestedContent/' + '123')
        .set('authorization',token)
        .send(
            {   title:'testingContent',
                body:'This content is made to test the content controller',
                tags:'testTag',}
            ).end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('msg').eql('contentId parameter must be a valid ObjectId.'); 
        done();});});});
});

})

after(function(done){
    User.collection.drop();
    SuggestedContent.collection.drop();
    done();
  });