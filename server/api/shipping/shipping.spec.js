'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Shipping = require('./shipping.model');

var mockData = {
    "title": "Free Shipping",
    "slug": "free",
    "company": "FedEx",
    "status": {
        "key": "1",
        "value": "Live"
    },
    "price": "0",
    "price_min": "10.00",
    "price_max": "100.00",
    "weight_min": "10.00",
    "weight_max": "100.00",
    "description": "Free shipping on orders between £10 and £100",
    "tax_band": {
        "title": "Default",
        "description": null,
        "rate": "20.00"
    }
}

var updatedMockData = {
    "title": "Free Shipping Updated",
    "slug": "free",
    "company": "FedEx",
    "status": {
        "key": "1",
        "value": "Live"
    },
    "price": "0",
    "price_min": "10.00",
    "price_max": "100.00",
    "weight_min": "10.00",
    "weight_max": "100.00",
    "description": "Free shipping on orders between £10 and £100",
    "tax_band": {
        "title": "Default",
        "description": null,
        "rate": "20.00"
    }
}

var shippingId = '';

describe('/api/shipping', function() {

    before(function(done) {
        // Clear shipping before testing
        Shipping.remove().exec().then(function() {
            done();
        });
    });

    it('should POST shipping data', function(done) {
        request(app)
            .post('/api/shipping')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.title.should.equal("Free Shipping");
                shippingId = res.body._id;
                done();
            });
    });

    it('should GET all the shipping', function(done) {
        request(app)
            .get('/api/shipping')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].title.should.equal("Free Shipping");
                done();
            });
    });

    it('should GET shipping by id', function(done) {
        request(app)
            .get('/api/shipping/' + shippingId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.title.should.equal("Free Shipping");
                done();
            });
    });

    it('should update shipping by id using PUT method', function(done) {
        request(app)
            .put('/api/shipping/' + shippingId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.title.should.equal("Free Shipping Updated");
                done();
            });
    });

    it('should update shipping by id using PATCH method', function(done) {
        request(app)
            .patch('/api/shipping/' + shippingId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.title.should.equal("Free Shipping");
                done();
            });
    });

    it('should delete shipping by id using delete method', function(done) {
        request(app)
            .delete('/api/shipping/' + shippingId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
