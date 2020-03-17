const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is_auth');

//Add Product Get
router.get('/add-product', isAuth, adminController.getAddProduct);

//Add Product Post
router.post('/add-product', adminController.postAddProduct);

//Product Lists
router.get('/products', isAuth, adminController.getProducts);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

module.exports = router; // export first method

// exports.routes = router;// export second method

// exports.products = products;