'use strict'

const chai      = require('chai')
const expect    = require('chai').expect

chai.use(require('chai-http'))
const app = require('../index')


describe('API endpoint /colors', function(){
    this.timeout(5000); //how long to wait for a response (ms)

    before(function(){

    });

    after(function(){

    });

    //Get - List of all colors
    it('should return all colors', function(){
        return chai.request(app)
            .get('/colors')
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.results).to.be.an('array');
            })
    })


    //GET - Invalid Path
    it('should return Not Found', function(){
        return chai.request(app)
            .get('/INVALID_PATH')
            .then(function(res){
                throw new Error('path exist!')
            })
            .catch(function(err){
                expect(err).to.have.status(400)
            })
    })

    //POST - Add New Color
    it('should add new color', function(){
        return chai.request(app)
            .post('/colors')
            .send({
                color: 'YELLOW'
            })
            .then(function(res){
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.results).to.be.an('array').that.includes('YELLOW');
            });
    })


    //POST - Bad Request
    it('should return Bad Request', function(){
        return chai.request(app)
            .post('/colors')
            .type('form')
            .send({
                color: 'YELLOW'
            })
            .then(function(res){
                throw new Error('Invalid content type!')
            })
            .catch(function(err){
                expect(err).to.have.status(400);
            });
    })
})