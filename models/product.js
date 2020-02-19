const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title, image, price, description) {
        this.title = title;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find().toArray()
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;