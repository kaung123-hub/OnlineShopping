const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

const adminData = require('./admin');

router.get('/', productController.getProducts);

module.exports = router;