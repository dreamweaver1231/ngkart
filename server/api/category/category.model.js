'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
    "order": Number,
    "created_at": {
        type: Date,
        default: Date.now
    },
    "updated_at": {
        type: Date,
        default: Date.now
    },
    "parent": String,
    "title": String,
    "slug": {
        type: String,
        required: true
    },
    "status": {
        "value": String,
        "data": {
            "key": String,
            "value": String
        }
    },
    "description": String
});

module.exports = mongoose.model('Category', CategorySchema);
