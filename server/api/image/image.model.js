'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
    "name": String,
    "url": {
        "http": String,
        "https": String
    },
    "segments": {
        "domain": String,
        "suffix": String
    }
});

module.exports = mongoose.model('Image', ImageSchema);
