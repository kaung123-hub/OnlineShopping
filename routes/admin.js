const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

//Add Product Get
router.get('/add-product', adminController.getAddProduct);

//Add Product Post
router.post('/add-product', adminController.postAddProduct);

//Product Lists
router.get('/products', adminController.getProducts);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

module.exports = router;// export first method

// exports.routes = router;// export second method

// exports.products = products;