'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShippingSchema = new Schema({
    "title": String,
    "slug": String,
    "company": String,
    "status": {
        "key": Number,
        "value": String
    },
    "price": Number,
    "price_min": Number,
    "price_max": Number,
    "weight_min":Number,
    "weight_max": Number,
    "description": String,
    "tax_band": {
        "title": String,
        "description": String,
        "rate": Number
    }
});

module.exports = mongoose.model('Shipping', ShippingSchema);
