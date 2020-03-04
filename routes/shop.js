const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

const adminData = require('./admin');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// router.get('/orders', shopController.getOrders);

// router.get('/cart', shopController.getCarts);

// router.post('/cart', shopController.postCart);

// router.post('/delete-cart-item', shopController.postDeleteCart);

router.get('/products/:productId', shopController.getProduct);

// router.post('/orders', shopController.postOrders);

// router.get('/orders', shopController.showOrders);

module.exports = router;