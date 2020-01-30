const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

//Add Product Get
router.get('/add-product', productController.getAddProduct);

//Add Product Post
router.post('/add-product', productController.postAddProduct);

module.exports = router;// export first method

// exports.routes = router;// export second method

// exports.products = products;