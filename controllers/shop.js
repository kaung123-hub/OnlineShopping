const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.find()
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
    Product.find()
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

// exports.getOrders = (req, res, next) => {
//     res.render('shop/order.ejs', {
//         pageTitle: 'Your Orders',
//         path: '/orders',
//     })
// }

// exports.getCarts = (req, res, next) => {
//     req.user.getCart()
//         .then(products => {
//             res.render('shop/cart.ejs', {
//                 pageTitle: 'Your Cart',
//                 path: '/cart',
//                 prods: products
//             })
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }

// exports.postCart = (req, res, next) => {
//     const productId = req.body.prodId;
//     Product.findById(productId)
//         .then(product => {
//             return req.user.addToCart(product);
//         })
//         .then(result => {
//             res.redirect('/cart');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// exports.postDeleteCart = (req, res, next) => {
//     const productId = req.body.productId;
//     console.log(productId);
//     req.user.deleteCartItem(productId);
//     res.redirect('/cart');
// }

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

// exports.postOrders = (req, res, next) => {
//     req.user.addOrders()
//         .then(result => {
//             res.redirect('/cart')
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// exports.showOrders = (req, res, next) => {
//     req.user.getOrders()
//         .then(product => {
//             console.log(product);
//             res.render('shop/order.ejs', {
//                 pageTitle: this.getOrders,
//                 path: '/orders',
//                 product: product
//             })
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }