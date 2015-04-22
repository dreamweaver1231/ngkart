'use strict';

var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ProductSchema = new Schema({
    "order": String,
    "created_at": {type: Date, default: Date.now},
    "updated_at": {type: Date, default: Date.now},
    "sku": String,
    "title": String,
    "slug": String,
    "price": Number,
    "sale_price": Number,
    "status": {
        "value": String,
        "data": {
            "key": Number,
            "value": String
        }
    },
    "category": ObjectId, // points to category schema
    "stock_level": Number,
    "stock_status": {
        "value": String,
        "data": {
            "key": Number,
            "value": String
        }
    },
    "description": String,
    "requires_shipping": {
        "value": String,
        "data": {
            "key": Number,
            "value": String
        }
    },
    "weight": Number,
    "height": Number,
    "width": Number,
    "depth": Number,
    "brand": ObjectId,  //points to brand model
    "collections": ObjectId,  //points to collection model
    "tax_band": ObjectId,  //points to tax model
    "catalog_only": {
        "value": String,
        "data": {
            "key": Number,
            "value": String
        }
    },
    "pricing": {
        "formatted": {
            "with_tax": String,
            "without_tax": String,
            "tax": String
        },
        "rounded": {
            "with_tax": Number,
            "without_tax": Number,
            "tax": Number
        },
        "raw": {
            "with_tax": Number,
            "without_tax": Number,
            "tax": Number
        }
    },
    "is_variation": Boolean,
    "modifiers": [],
    "images": ObjectId //points to images model
});

ProductSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Product', ProductSchema);
