'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AddressSchema = new Schema({
    "order": {},
    "created_at": {
        type: Date,
        default: Date.now
    },
    "updated_at": {
        type: Date,
        default: Date.now
    },
    "save_as": String,
    "first_name": {
        type: String,
        required: true
    },
    "last_name": String,
    "address_1": {
        type: String,
        required: true
    },
    "address_2": String,
    "postcode": {
        type: String,
        required: true
    },
    "country": {
        "value": String,
        "data": {
            "code": String,
            "name": String
        }
    },
    "company": String,
    "city": String,
    "customer": {
        "value": String,
        "data": [ObjectId] //this is a link to the customer object
    },
    "phone": {
        type: String,
        required: true
    },
    "county": String,
    "instructions": String
});

module.exports = mongoose.model('Address', AddressSchema);
