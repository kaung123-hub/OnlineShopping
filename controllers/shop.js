const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index.ejs', {
                pageTitle: 'Index',
                path: '/',
                prods: products
            })
        })
        .catch(err => {
            console.log(err);
        })

};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list.ejs', {
                pageTitle: 'All Products',
                path: '/products',
                prods: products
            })
        })
        .catch(err => {
            console.log(err);
        })
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

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.render('shop/product-detail.ejs', {
                pageTitle: 'Product Details',
                path: '/products',
                product: product
            })
        })
        .catch(err => {
            console.log(err);
        });
}