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


const registeringUser = {
    username: 'ranon',
    password: 'testingpassword',
    confirmpassword: 'testingpassword',
    email: 'ranon@ranon.com'
  }
  
  const registeringUserLoginCredentials = {
    username: 'ranon123123',
    password: 'testingpassword'
  }
  
  var authenticatedUser2 = null;
  var token = null;

describe('Testing SuggestedContent', () => 
{

    beforeEach(function(done){                   // Registering a user to use in further tests before running, cant use the above hardcoded one as it doesn't test hashing
  mongoose.connect('mongodb://localhost:27017/nodejs-test');
      var data = {
      username: 'ranon123123',
        securityQ: 'user.secQField',
        securityA : 'user.secAField',
        password: 'testingpassword',
      confirmPassword: 'testingpassword',
      // token : '123',
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
      })

    //////////////#1
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
    /////////////////#2 it doesnt see what is the suggested content
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
    ///////////////////////#3//add a user and add his id in the bidy of the request
    it('it should POST SuggestedContent ', (done) => 
    {
        let suggestedContentTest = 
        {
            title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag',
        }

        chai.request(server).post('/api/suggestedContent/addSuggestedContent').set('authorization',token)
        .send(suggestedContentTest).end((err, res) => 
        { res.should.have.status(201);
        res.body.should.have.property('msg').eql('Suggested Content was created successfully.' ); 
        done();
    });});
    /////////////////////////#4 it doesnt see what is the suggested content
    describe('DELETE/:id /api/suggestedContent/deleteSuggestedContent', () => {
    it('it should DELETE a suggestedContent given the id' , (done) => {
        let suggestedContentTest = new SuggestedContent(
        {
            title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag'
        })
        suggestedContentTest.save((err, suggestedContentTest) => { chai.request(server)
        .delete('/api/suggestedContent/deleteSuggestedContent/' + suggestedContentTest.id).set('authorization',token)
        .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('msg').eql('Content was deleted successfully.'); 
    done();});});});});
   ////////////////////////////#5 THE Patch method
   describe('/PATCH/:id /api/suggestedContent/updateSuggestedContent', () => {
   it('it should UPDATE a book given the id' , (done) => {
    let suggestedContentTest = new SuggestedContent
    ({title:'testingContent',
    body:'This content is made to test the content controller',
    tags:'testTag'})
    suggestedContentTest.save((err, suggestedContentTest) => { chai.request(server).patch('/api/suggestedContent/updateSuggestedContent/' + suggestedContentTest.id).set('authorization',token)
    .send(
        {   title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag',}
        ).end((err, res) => {
    res.should.have.status(200);
    res.body.should.have.property('msg').eql('Content was updated successfully.'); 
    done();});});});});



    afterEach(function(done){
        User.collection.drop();
        done();
      });
})
    