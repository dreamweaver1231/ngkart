'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Category = require('./category.model');

var mockData = {
    "id": 60,
    "order": 6,
    "parent": "initial",
    "title": "Featured",
    "slug": "featured",
    "status": {
        "value": "Live",
        "data": {
            "key": "1",
            "value": "Live"
        }
    },
    "description": "Featured products"
}

var updatedMockData = {
    "id": 60,
    "order": 6,
    "parent": "updated",
    "title": "Featured",
    "slug": "featured",
    "status": {
        "value": "Live",
        "data": {
            "key": "1",
            "value": "Live"
        }
    },
    "description": "Featured products"
}

var categoryId = '';

describe('/api/categories', function() {

    before(function(done) {
        // Clear categories before testing
        Category.remove().exec().then(function() {
            done();
        });
    });

    it('should POST category data', function(done) {
        request(app)
            .post('/api/categories')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.parent.should.equal('initial');
                categoryId = res.body._id;
                done();
            });
    });

    it('should GET all the categories', function(done) {
        request(app)
            .get('/api/categories')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].parent.should.equal('initial');
                done();
            });
    });

    it('should GET category by id', function(done) {
        request(app)
            .get('/api/categories/' + categoryId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.parent.should.equal('initial');
                done();
            });
    });

    it('should update category by id using PUT method', function(done) {
        request(app)
            .put('/api/categories/' + categoryId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.parent.should.equal('updated');
                done();
            });
    });

    it('should update category by id using PATCH method', function(done) {
        request(app)
            .patch('/api/categories/' + categoryId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.parent.should.equal('initial');
                done();
            });
    });

    it('should delete category by id using delete method', function(done) {
        request(app)
            .delete('/api/categories/' + categoryId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
