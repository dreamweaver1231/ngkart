/**
 * endpoints.
 * GET     /products/all?page=0&size=10             ->  all
 * GET     /products/specific/:id                   ->  show
 * GET     /products/:id                            ->  show
 * PUT     /products/:id                            ->  update
 * DELETE  /products/:id                            ->  destroy
 */

'use strict';

var _ = require('lodash');
var Product = require('./product.model');

// Get list of all products by count
exports.all = function(req, res) {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    var skip = page > 0 ? ((page - 1) * size) : 0;

    Product
        .find({})
        .skip(skip)
        .limit(size)
        .exec(cb)

    function cb(err, products) {
        if (err) return handleError(res, err);
        return res.json(200, products);
    }
};

// Get list of random products by count
exports.random = function(req, res) {
    Product
        .findRandom()
        .limit(req.params.count)
        .exec(cb)

    function cb(err, products) {
        if (err) return handleError(res, err);
        return res.json(200, products);
    }
};

// Get a single product
exports.show = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            return handleError(res, err);
        }
        if (!product) {
            return res.send(404);
        }
        return res.json(product);
    });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
    Product.create(req.body, function(err, product) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, product);
    });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            return handleError(res, err);
        }
        if (!product) {
            return res.send(404);
        }
        var updated = _.merge(product, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, product);
        });
    });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            return handleError(res, err);
        }
        if (!product) {
            return res.send(404);
        }
        product.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
