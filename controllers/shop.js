const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index.ejs', {
                pageTitle: 'Index',
                path: '/',
                prods: products,
                isAuthenticated: req.session.isLoggedIn
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
                prods: products,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getCarts = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart.ejs', {
                pageTitle: 'Your Cart',
                path: '/cart',
                prods: products,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.prodId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postDeleteCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user.deleteCartItem(productId);
    res.redirect('/cart');
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.render('shop/product-detail.ejs', {
                pageTitle: 'Product Details',
                path: '/products',
                product: product,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getOrders = (req, res, next) => {
    Order.find({ 'user': req.user._id })
        .then(orders => {
            console.log('orders');
            console.log(orders);
            res.render('shop/order.ejs', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders: orders,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postOrders = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: {...i.productId } }
            })
            const order = new Order({
                products: products,
                user: req.user._id
            })
            return order.save();
        }).then(result => {
            req.user.removeCart().then(
                result => {
                    res.redirect('/cart');
                }
            )
        })
        .catch(err => {
            console.log(err);
        });
}

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