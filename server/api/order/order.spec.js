'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Order = require('./order.model');

var mockData = {
    "product": {
        "value": "Espresso Cup - Small Red",
        "data": "5524c0b34ea30f98178cbf11"
    },
    "sku": "PRD_H0003_SMRE",
    "title": "Espresso Cup - Small Red",
    "price": "14.99",
    "quantity": 1,
    "tax_rate": "20.00",
    "tax_band": {
        "value": "Default",
        "data": "5524c0b34ea30f98178cbf11"
    },
    "created_at": "2014-05-30 12:44:41",
    "updated_at": "2014-05-30 12:44:41"
}

var updatedMockData = {
    "product": {
        "value": "Espresso Cup - Small Red",
        "data": "7774c0b34ea30f98178cbf11"
    },
    "sku": "PRD_H0003_SMRE",
    "title": "Espresso Cup - Small Red",
    "price": "14.99",
    "quantity": 1,
    "tax_rate": "20.00",
    "tax_band": {
        "value": "Default",
        "data": "7774c0b34ea30f98178cbf11"
    },
    "created_at": "2014-05-30 12:44:41",
    "updated_at": "2014-05-30 12:44:41"
}

var orderId = '';

describe('/api/orders', function() {

    before(function(done) {
        // Clear orders before testing
        Order.remove().exec().then(function() {
            done();
        });
    });

    it('should POST order data', function(done) {
        request(app)
            .post('/api/orders')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.product.data.should.equal('5524c0b34ea30f98178cbf11');
                orderId = res.body._id;
                done();
            });
    });

    it('should GET all the orders', function(done) {
        request(app)
            .get('/api/orders')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].product.data.should.equal('5524c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should GET order by id', function(done) {
        request(app)
            .get('/api/orders/' + orderId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.product.data.should.equal('5524c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should update order by id using PUT method', function(done) {
        request(app)
            .put('/api/orders/' + orderId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.product.data.should.equal('7774c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should update order by id using PATCH method', function(done) {
        request(app)
            .patch('/api/orders/' + orderId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.product.data.should.equal('5524c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should delete order by id using delete method', function(done) {
        request(app)
            .delete('/api/orders/' + orderId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
