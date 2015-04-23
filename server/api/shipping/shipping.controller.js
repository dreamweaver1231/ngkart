'use strict';

var _ = require('lodash');
var Shipping = require('./shipping.model');

// Get list of shippings
exports.index = function(req, res) {
  Shipping.find(function (err, shippings) {
    if(err) { return handleError(res, err); }
    return res.json(200, shippings);
  });
};

// Get a single shipping
exports.show = function(req, res) {
  Shipping.findById(req.params.id, function (err, shipping) {
    if(err) { return handleError(res, err); }
    if(!shipping) { return res.send(404); }
    return res.json(shipping);
  });
};

// Creates a new shipping in the DB.
exports.create = function(req, res) {
  Shipping.create(req.body, function(err, shipping) {
    if(err) { return handleError(res, err); }
    return res.json(201, shipping);
  });
};

// Updates an existing shipping in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Shipping.findById(req.params.id, function (err, shipping) {
    if (err) { return handleError(res, err); }
    if(!shipping) { return res.send(404); }
    var updated = _.merge(shipping, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, shipping);
    });
  });
};

// Deletes a shipping from the DB.
exports.destroy = function(req, res) {
  Shipping.findById(req.params.id, function (err, shipping) {
    if(err) { return handleError(res, err); }
    if(!shipping) { return res.send(404); }
    shipping.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}