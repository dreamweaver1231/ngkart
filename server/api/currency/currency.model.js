'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CurrencySchema = new Schema({
    "code": String,
    "title": String,
    "enabled": Boolean,
    "modifier": String,
    "exchange_rate": Number,
    "format": String,
    "decimal_point": String,
    "thousand_point": String,
    "rounding": String,
    "default": Boolean,
    "created_at": String,
    "updated_at": String
});

module.exports = mongoose.model('Currency', CurrencySchema);