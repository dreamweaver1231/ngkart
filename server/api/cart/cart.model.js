'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CartSchema = new Schema({
    "contents": [ObjectId], //refers to product model
    "discount_coe": String,
    "total_items": Number,
    "total_unique_items": Number,
    "totals": {
        "formatted": {
            "with_tax": String,
            "without_tax": String
        },
        "rounded": {
            "with_tax": Number,
            "without_tax": Number
        },
        "raw": {
            "with_tax": Number,
            "without_tax": Number
        }
    },
    "currency": [ObjectId], //refers to currency model
});

module.exports = mongoose.model('Cart', CartSchema);
