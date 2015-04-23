'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TaxSchema = new Schema({
    "title": String,
    "description": String,
    "rate": Number,
    "currency": ObjectId
});

module.exports = mongoose.model('Tax', TaxSchema);
