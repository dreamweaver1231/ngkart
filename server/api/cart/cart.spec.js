'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Cart = require('./cart.model');

var mockData = {
    "contents": ["5524c0b34ea30f98178cbf17"],
    "discount_coe": null,
    "total_items": 6,
    "total_unique_items": 6,
    "totals": {
        "formatted": {
            "with_tax": "$71.93",
            "without_tax": "$59.94"
        },
        "rounded": {
            "with_tax": 71.93,
            "without_tax": 59.94
        },
        "raw": {
            "with_tax": 71.928,
            "without_tax": 59.94
        }
    },
    "currency": ["5524c0b34ea30f98178cbf17"]
}

var updatedMockData = {
    "contents": ["5524c0b34ea30f98178cbf17"],
    "discount_coe": null,
    "total_items": 6,
    "total_unique_items": 6,
    "totals": {
        "formatted": {
            "with_tax": "$71.93",
            "without_tax": "$59.94"
        },
        "rounded": {
            "with_tax": 71.93,
            "without_tax": 59.94
        },
        "raw": {
            "with_tax": 71.928,
            "without_tax": 59.94
        }
    },
    "currency": ["7774c0b34ea30f98178cbf17"]
}

var cartId = '';

describe('/api/carts', function() {

    before(function(done) {
        // Clear carts before testing
        Cart.remove().exec().then(function() {
            done();
        });
    });

    it('should POST cart data', function(done) {
        request(app)
            .post('/api/carts')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.currency[0].should.equal("5524c0b34ea30f98178cbf17");
                cartId = res.body._id;
                done();
            });
    });

    it('should GET all the carts', function(done) {
        request(app)
            .get('/api/carts')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].currency[0].should.equal("5524c0b34ea30f98178cbf17");
                done();
            });
    });

    it('should GET cart by id', function(done) {
        request(app)
            .get('/api/carts/' + cartId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.currency[0].should.equal("5524c0b34ea30f98178cbf17");
                done();
            });
    });

    it('should update cart by id using PUT method', function(done) {
        request(app)
            .put('/api/carts/' + cartId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.currency[0].should.equal("7774c0b34ea30f98178cbf17");
                done();
            });
    });

    it('should update cart by id using PATCH method', function(done) {
        request(app)
            .patch('/api/carts/' + cartId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.currency[0].should.equal("5524c0b34ea30f98178cbf17");
                done();
            });
    });

    it('should delete cart by id using delete method', function(done) {
        request(app)
            .delete('/api/carts/' + cartId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
