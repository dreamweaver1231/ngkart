'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Product = require('./product.model');


var mockData = {
    "id": 6,
    "order": "order",
    "sku": "PRD_A0002",
    "title": "Conté Sticks",
    "slug": "conte-sticks",
    "price": 9.99,
    "sale_price": 8.99,
    "status": {
        "value": "Live",
        "data": {
            "key": "1",
            "value": "Live"
        }
    },
    "category": "5524c0b34ea30f98178cbf11",
    "stock_level": 1050,
    "stock_status": {
        "value": "In Stock",
        "data": {
            "key": "1",
            "value": "In Stock"
        }
    },
    "description": "Drawing with conté sticks is a sure way to achive high contrast, richly pigmented images. This media can also be used to shapen lines as a final stage of a painting's development. ",
    "requires_shipping": {
        "value": "Yes",
        "data": {
            "key": "1",
            "value": "Yes"
        }
    },
    "weight": 10,
    "height": 10,
    "width": 10,
    "depth": 10,
    "brand": "5524c0b34ea30f98178cbf11",
    "collections": "5524c0b34ea30f98178cbf11",
    "tax_band": "5524c0b34ea30f98178cbf11",
    "catalog_only": {
        "value": "No",
        "data": {
            "key": "0",
            "value": "No"
        }
    },
    "pricing": {
        "formatted": {
            "with_tax": "£11.99",
            "without_tax": "£9.99",
            "tax": "£2.00"
        },
        "rounded": {
            "with_tax": 11.99,
            "without_tax": 9.99,
            "tax": 2
        },
        "raw": {
            "with_tax": 11.988,
            "without_tax": 9.99,
            "tax": 1.998
        }
    },
    "is_variation": false,
    "modifiers": ['modifiers'],
    "images": "5524c0b34ea30f98178cbf11"
}

var updatedMockData = {
    "id": 6,
    "order": "order",
    "sku": "PRD_A0002",
    "title": "Conté Sticks",
    "slug": "conte-sticks",
    "price": 9.99,
    "sale_price": 8.99,
    "status": {
        "value": "Live",
        "data": {
            "key": "1",
            "value": "Live"
        }
    },
    "category": "7774c0b34ea30f98178cbf11",
    "stock_level": 1050,
    "stock_status": {
        "value": "In Stock",
        "data": {
            "key": "1",
            "value": "In Stock"
        }
    },
    "description": "Drawing with conté sticks is a sure way to achive high contrast, richly pigmented images. This media can also be used to shapen lines as a final stage of a painting's development. ",
    "requires_shipping": {
        "value": "Yes",
        "data": {
            "key": "1",
            "value": "Yes"
        }
    },
    "weight": 10,
    "height": 10,
    "width": 10,
    "depth": 10,
    "brand": "7774c0b34ea30f98178cbf11",
    "collections": "7774c0b34ea30f98178cbf11",
    "tax_band": "7774c0b34ea30f98178cbf11",
    "catalog_only": {
        "value": "No",
        "data": {
            "key": "0",
            "value": "No"
        }
    },
    "pricing": {
        "formatted": {
            "with_tax": "£11.99",
            "without_tax": "£9.99",
            "tax": "£2.00"
        },
        "rounded": {
            "with_tax": 11.99,
            "without_tax": 9.99,
            "tax": 2
        },
        "raw": {
            "with_tax": 11.988,
            "without_tax": 9.99,
            "tax": 1.998
        }
    },
    "is_variation": false,
    "modifiers": ['modifiers'],
    "images": "7774c0b34ea30f98178cbf11"
}

var productId = '';

describe('/api/products', function() {

    before(function(done) {
        // Clear products before testing
        Product.remove().exec().then(function() {
            done();
        });
    });

    it('should POST product data', function(done) {
        request(app)
            .post('/api/products')
            .set('Content-Type', 'application/json')
            .send(mockData)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.category.should.equal('5524c0b34ea30f98178cbf11');
                productId = res.body._id;
                done();
            });
    });

    it('should GET all the products', function(done) {
        request(app)
            .get('/api/products/all?page=0&size=1 ')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body.length.should.equal(1);
                res.body[0].category.should.equal('5524c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should GET all the random products', function(done) {
        request(app)
            .get('/api/products/random/1 ')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body.length.should.equal(1);
                res.body[0].category.should.equal('5524c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should GET product by id', function(done) {
        request(app)
            .get('/api/products/specific/' + productId)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.category.should.equal('5524c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should update product by id using PUT method', function(done) {
        request(app)
            .put('/api/products/' + productId)
            .send(updatedMockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.category.should.equal('7774c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should update product by id using PATCH method', function(done) {
        request(app)
            .patch('/api/products/' + productId)
            .send(mockData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.category.should.equal('5524c0b34ea30f98178cbf11');
                done();
            });
    });

    it('should delete product by id using delete method', function(done) {
        request(app)
            .delete('/api/products/' + productId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

});
