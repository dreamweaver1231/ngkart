'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema({
    "title": String,
    "slug": String,
    "status": {
        "key": Number,
        "value": String
    },
    "description": String
});

module.exports = mongoose.model('Brand', BrandSchema);
