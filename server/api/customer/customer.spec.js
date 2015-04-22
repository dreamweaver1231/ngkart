'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Customer = require('./customer.model');

var mockData = {
    "order": "initial",
    "first_name": "Homer",
    "last_name": "Simpson",
    "email": "hjsimpson@springfield.net",
    "group": null,
    "history": {
        "orders": 3,
        "value": "211.89",
        "addresses": 4
    }
}

var updatedMockData = {
    "order": "updated",
    "first_name": "Homer",
    "last_name": "Simpson",
    "email": "hjsimpson@springfield.net",
    "group": null,
    "history": {
        "orders": 3,
        "value": "211.89",
        "addresses": 4
    }
}

var customerId = '';

describe('/api/customers', function() {

    before(function(done) {
        // Clear users before testing
        Customer.remove().exec().then(function() {
            done();
        });
    });

    it('should POST customer data', function(done) {
        request(app)
            .post('/api/customers')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.order.should.equal('initial');
                customerId = res.body._id;
                done();
            });
    });

    it('should GET all the customers', function(done) {
        request(app)
            .get('/api/customers/')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].order.should.equal('initial');
                done();
            });
    });

    it('should GET customer by id', function(done) {
        request(app)
            .get('/api/customers/' + customerId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.order.should.equal('initial');
                done();
            });
    });

    it('should update customer by id using PUT method', function(done) {
        request(app)
            .put('/api/customers/' + customerId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.order.should.equal('updated');
                done();
            });
    });

    it('should update customer by id using PATCH method', function(done) {
        request(app)
            .patch('/api/customers/' + customerId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.order.should.equal('initial');
                done();
            });
    });

    it('should delete customer by id using delete method', function(done) {
        request(app)
            .delete('/api/customers/' + customerId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
