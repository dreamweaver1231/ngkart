'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    "order": String,
    "created_at": {
        type: Date,
        default: Date.now
    },
    "updated_at": {
        type: Date,
        default: Date.now
    },
    "first_name": String,
    "last_name": String,
    "email": String,
    "group": String,
    "history": {
        "orders": Number,
        "value": Number,
        "addresses": Number
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
