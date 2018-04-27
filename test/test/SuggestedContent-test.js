var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var server = require('../../Backend/app');
var User = require("../../Backend/api/models/User");
var Content = require("../../Backend/api/models/SuggestedContent");
var should = chai.should();

dbURI = 'mongodb://localhost:27017/nodejs-test';

chai.use(chaiHttp);


describe('Testing SuggestedContent', () => 
{
    //////////////#1
    describe('GET /api/suggestedContent/viewSuggestedContents', () => {
    it('should retrieve all the content successfully on /api/suggestedContent/viewSuggestedContents GET', (done) => {
    chai.request(server)
    .get('/api/suggestedContent/viewSuggestedContents')
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
        chai.request(server).get('/api/suggestedContent/viewSuggestedContent' + suggestedContentTest.id).
        send(suggestedContentTest).end((err, res) => 
        {
            res.should.have.status(200); 
            res.body.should.have.property('title'); 
            res.body.should.have.property('body'); 
            res.body.should.have.property('tags'); 
            res.body.msg.should.equal("content retrieved successfully.");
            res.body.should.have.property('_id').eql(suggestedContentTest.id);
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

        chai.request(server).post('/api/suggestedContent/addSuggestedContent').send(suggestedContentTest).end((err, res) => 
        { res.should.have.status(201);
        res.body.should.have.property('message').eql('Suggested Content was created successfully.' ); 
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
        .delete('/api/suggestedContent/deleteSuggestedContent/' + suggestedContentTest.id) .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Content was deleted successfully.'); 
    done();});});});});
   ////////////////////////////#5 THE Patch method
   describe('/PATCH/:id /api/suggestedContent/updateSuggestedContent', () => {
   it('it should UPDATE a book given the id' , (done) => {
    let suggestedContentTest = new SuggestedContent
    ({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
    suggestedContentTest.save((err, suggestedContentTest) => { chai.request(server).patch('/api/suggestedContent/updateSuggestedContent/' + suggestedContentTest.id)
    .send(
        {   title:'testingContent',
            body:'This content is made to test the content controller',
            tags:'testTag',}
        ).end((err, res) => {
    res.should.have.status(200);
    res.body.should.have.property('message').eql('Content was updated successfully.'); 
    done();});});});});


})
    