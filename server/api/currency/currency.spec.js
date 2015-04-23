'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Currency = require('./currency.model');

var mockData = {
    "code": "USD",
    "title": "US Dollar",
    "enabled": true,
    "modifier": "++0",
    "exchange_rate": 1.65,
    "format": "${price}",
    "decimal_point": ".",
    "thousand_point": ",",
    "default": false
}

var updatedMockData = {
    "code": "Rs",
    "title": "India Rupee",
    "enabled": true,
    "modifier": "++0",
    "exchange_rate": 1.65,
    "format": "${price}",
    "decimal_point": ".",
    "thousand_point": ",",
    "default": false
}

var currencyId = '';

describe('/api/currencies', function() {

    before(function(done) {
        // Clear currencies before testing
        Currency.remove().exec().then(function() {
            done();
        });
    });

    it('should POST currency data', function(done) {
        request(app)
            .post('/api/currencies')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.code.should.equal('USD');
                currencyId = res.body._id;
                done();
            });
    });

    it('should GET all the currencies', function(done) {
        request(app)
            .get('/api/currencies')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].code.should.equal('USD');
                done();
            });
    });

    it('should GET currency by id', function(done) {
        request(app)
            .get('/api/currencies/' + currencyId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.code.should.equal('USD');
                done();
            });
    });

    it('should update currency by id using PUT method', function(done) {
        request(app)
            .put('/api/currencies/' + currencyId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.code.should.equal('Rs');
                done();
            });
    });

    it('should update currency by id using PATCH method', function(done) {
        request(app)
            .patch('/api/currencies/' + currencyId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.code.should.equal('USD');
                done();
            });
    });

    it('should delete currency by id using delete method', function(done) {
        request(app)
            .delete('/api/currencies/' + currencyId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
