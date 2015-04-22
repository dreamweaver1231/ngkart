'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Address = require('./address.model');

var mockData = {
    "order": null,
    "created_at": "2014-10-03 16:18:02",
    "updated_at": "2014-10-03 16:18:02",
    "save_as": "Home",
    "first_name": "Homer",
    "last_name": "Simpson",
    "address_1": "742 Evergreen Terrace",
    "address_2": "",
    "postcode": "58008",
    "country": {
        "value": "United States",
        "data": {
            "code": "US",
            "name": "United States"
        }
    },
    "company": "",
    "city": "Springfield",
    "customer": {
        "value": "CUSTOMER EMAIL",
        "data": ["5524c0b34ea30f98178cbf17"]
    },
    "phone": "919780445795",
    "county": "Unknown",
    "instructions": "Beware of the dog"
}

var updatedMockData = {
    "order": null,
    "created_at": "2014-10-03 16:18:02",
    "updated_at": "2014-10-03 16:18:02",
    "save_as": "Home",
    "first_name": "Homer",
    "last_name": "Simpson",
    "address_1": "742 Evergreen Terrace",
    "address_2": "",
    "postcode": "58008",
    "country": {
        "value": "United States",
        "data": {
            "code": "US",
            "name": "United States"
        }
    },
    "company": "",
    "city": "Springfield",
    "customer": {
        "value": "CUSTOMER EMAIL",
        "data": ["5524c0b34ea30f98178cbf17"]
    },
    "phone": "919988234611",
    "county": "Unknown",
    "instructions": "Beware of the dog"
}

var addressId = '';

describe('/api/addresses', function() {

    before(function(done) {
        // Clear addresses before testing
        Address.remove().exec().then(function() {
            done();
        });
    });

    it('should POST address data', function(done) {
        request(app)
            .post('/api/addresses')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.phone.should.equal('919780445795');
                addressId = res.body._id;
                done();
            });
    });

    it('should GET all the addresses', function(done) {
        request(app)
            .get('/api/addresses')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body[0].phone.should.equal('919780445795');
                done();
            });
    });

    it('should GET address by id', function(done) {
        request(app)
            .get('/api/addresses/' + addressId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.phone.should.equal('919780445795');
                done();
            });
    });

    it('should update address by id using PUT method', function(done) {
        request(app)
            .put('/api/addresses/' + addressId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.phone.should.equal('919988234611');
                done();
            });
    });

    it('should update address by id using PATCH method', function(done) {
        request(app)
            .patch('/api/addresses/' + addressId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.phone.should.equal('919780445795');
                done();
            });
    });

    it('should delete address by id using delete method', function(done) {
        request(app)
            .delete('/api/addresses/' + addressId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
