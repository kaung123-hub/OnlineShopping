const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll((cb) => {
        res.render('shop/index.ejs', {
            pageTitle: 'Index',
            path: '/',
            prods: cb
        })
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((cb) => {
        res.render('shop/product-list.ejs', {
            pageTitle: 'All Products',
            path: '/products',
            prods: cb
        })
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/order.ejs', {
        pageTitle: 'Your Orders',
        path: '/orders',
    })
}

exports.getCarts = (req, res, next) => {
    res.render('shop/cart.ejs', {
        pageTitle: 'Your Cart',
        path: '/cart',
    })
}