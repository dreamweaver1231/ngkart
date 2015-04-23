'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Brand = require('./brand.model');

var mockData = {
    "title": "Example Brand",
    "slug": "example-brand",
    "status": {
        "key": "1",
        "value": "Live"
    },
    "description": "Example brand description",
    "images": []
}

var updatedMockData = {
    "title": "Example Brand Updated",
    "slug": "example-brand",
    "status": {
        "key": "1",
        "value": "Live"
    },
    "description": "Example brand description",
    "images": []
}

var brandId = '';

describe('/api/brands', function() {

    before(function(done) {
        // Clear brands before testing
        Brand.remove().exec().then(function() {
            done();
        });
    });

    it('should POST brand data', function(done) {
        request(app)
            .post('/api/brands')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.title.should.equal("Example Brand");
                brandId = res.body._id;
                done();
            });
    });

    it('should GET all the brands', function(done) {
        request(app)
            .get('/api/brands')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].title.should.equal("Example Brand");
                done();
            });
    });

    it('should GET brand by id', function(done) {
        request(app)
            .get('/api/brands/' + brandId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.title.should.equal("Example Brand");
                done();
            });
    });

    it('should update brand by id using PUT method', function(done) {
        request(app)
            .put('/api/brands/' + brandId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.title.should.equal("Example Brand Updated");
                done();
            });
    });

    it('should update brand by id using PATCH method', function(done) {
        request(app)
            .patch('/api/brands/' + brandId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.title.should.equal("Example Brand");
                done();
            });
    });

    it('should delete brand by id using delete method', function(done) {
        request(app)
            .delete('/api/brands/' + brandId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
