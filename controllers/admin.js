const Product = require('../models/product');
// const mongodb = require('mongodb');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/product-form.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        image: image,
        price: price,
        description: description,
        userId: req.user._id
    });
    product.save()
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.find()
        // .populate('userId') //can retrieve all user data of userId 
        // .select('title price -_id') //only the selected data is retrieved and -_id is not to show 
        .then(products => {
            console.log(products)
            res.render('admin/products.ejs', {
                pageTitle: 'Admin Product Lists',
                path: '/admin/products',
                prods: products
            })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const editMode = req.query.edit;
    Product.findById(prodId)
        .then(product => {
            res.render('admin/product-form.ejs', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: product,
                editing: editMode
            })
        })
        .catch()
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.image;
    const updatedPrice = req.body.price;
    const updatedDes = req.body.description;
    Product.findByIdAndUpdate({ _id: prodId }, {
        title: updatedTitle,
        image: updatedImage,
        price: updatedPrice,
        description: updatedDes,
        userId: req.user._id
    }) //first Method
        // Product.findById(prodId)
        //     .then(product => {
        //         product.title = updatedTitle,
        //             product.image = updatedImage,
        //             product.price = updatedPrice,
        //             product.description = updatedDes
        //         return product.save()
        //     }) //second method
        .then(result => {
            console.log('Your updated is successfull!')
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log("Delete Successfull!!");
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}