'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Image = require('./image.model');

var mockData = {
    "name": "artistscrayons.jpg",
    "url": {
        "http": "http://commercecdn.com/1/artistscrayons.jpg",
        "https": "https://commercecdn.com/1/artistscrayons.jpg"
    },
    "segments": {
        "domain": "commercecdn.com/",
        "suffix": "1/artistscrayons.jpg"
    }
}

var updatedMockData = {
    "name": "updatedartistscrayons.jpg",
    "url": {
        "http": "http://commercecdn.com/1/artistscrayons.jpg",
        "https": "https://commercecdn.com/1/artistscrayons.jpg"
    },
    "segments": {
        "domain": "commercecdn.com/",
        "suffix": "1/artistscrayons.jpg"
    }
}

var imageId = '';

describe('/api/images', function() {

    before(function(done) {
        // Clear images before testing
        Image.remove().exec().then(function() {
            done();
        });
    });

    it('should POST image data', function(done) {
        request(app)
            .post('/api/images')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.name.should.equal("artistscrayons.jpg");
                imageId = res.body._id;
                done();
            });
    });

    it('should GET all the images', function(done) {
        request(app)
            .get('/api/images')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].name.should.equal("artistscrayons.jpg");
                done();
            });
    });

    it('should GET image by id', function(done) {
        request(app)
            .get('/api/images/' + imageId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.name.should.equal("artistscrayons.jpg");
                done();
            });
    });

    it('should update image by id using PUT method', function(done) {
        request(app)
            .put('/api/images/' + imageId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.name.should.equal("updatedartistscrayons.jpg");
                done();
            });
    });

    it('should update image by id using PATCH method', function(done) {
        request(app)
            .patch('/api/images/' + imageId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.name.should.equal("artistscrayons.jpg");
                done();
            });
    });

    it('should delete image by id using delete method', function(done) {
        request(app)
            .delete('/api/images/' + imageId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
