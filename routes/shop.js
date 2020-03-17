const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

const adminData = require('./admin');

const isAuth = require('../middleware/is_auth');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

// router.get('/orders', shopController.getOrders);

router.get('/cart', isAuth, shopController.getCarts);

router.post('/cart', shopController.postCart);

router.post('/delete-cart-item', shopController.postDeleteCart);

router.post('/orders', isAuth, shopController.postOrders);

router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;