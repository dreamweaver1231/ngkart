'use strict';

var express = require('express');
var controller = require('./product.controller');

var router = express.Router();

router.get('/all', controller.all);
router.get('/random/:count', controller.random);
router.get('/specific/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;

//all count
//top count
//random count
//best seller count
//specific product 1
//related product count