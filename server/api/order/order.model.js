'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OrderSchema = new Schema({
    "product": {
        "value": String,
        "data": ObjectId //points to product model
    },
    "sku": String,
    "title": String,
    "price": Number,
    "quantity": Number,
    "tax_rate": Number,
    "tax_band": {
        "value": String,
        "data": ObjectId //points to tax model
    },
    "created_at": {
        type: Date,
        default: Date.now
    },
    "updated_at": {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
