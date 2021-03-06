'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Tax = require('./tax.model');

var mockData = {
    "title": "My awesome tax band",
    "description": "Awesome products are charged tax at 99% right?...",
    "rate": "99.00",
    "currency": "5524c0b34ea30f98178cbf11"
}

var updatedMockData = {
    "title": "My awesome tax band Updated",
    "description": "Awesome products are charged tax at 99% right?...",
    "rate": "99.00",
    "currency": "7774c0b34ea30f98178cbf11"
}

var taxId = '';

describe('/api/taxes', function() {

    before(function(done) {
        // Clear taxes before testing
        Tax.remove().exec().then(function() {
            done();
        });
    });

    it('should POST tax data', function(done) {
        request(app)
            .post('/api/taxes')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.currency.should.equal("5524c0b34ea30f98178cbf11");
                taxId = res.body._id;
                done();
            });
    });

    it('should GET all the taxes', function(done) {
        request(app)
            .get('/api/taxes')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].currency.should.equal("5524c0b34ea30f98178cbf11");
                done();
            });
    });

    it('should GET tax by id', function(done) {
        request(app)
            .get('/api/taxes/' + taxId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.currency.should.equal("5524c0b34ea30f98178cbf11");
                done();
            });
    });

    it('should update tax by id using PUT method', function(done) {
        request(app)
            .put('/api/taxes/' + taxId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.currency.should.equal("7774c0b34ea30f98178cbf11");
                done();
            });
    });

    it('should update tax by id using PATCH method', function(done) {
        request(app)
            .patch('/api/taxes/' + taxId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.currency.should.equal("5524c0b34ea30f98178cbf11");
                done();
            });
    });

    it('should delete tax by id using delete method', function(done) {
        request(app)
            .delete('/api/taxes/' + taxId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
