const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

const adminData = require('./admin');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/orders', shopController.getOrders);

router.get('/cart', shopController.getCarts);

module.exports = router;