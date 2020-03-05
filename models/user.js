const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        Required: true
    },
    email: {
        type: String,
        Required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
})

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() == product._id.toString();
    }) // findIndex return first element in the object
    let quantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
        let updatedQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = updatedQuantity;
    }
    else {
        updatedCartItems.push({ productId: product._id, quantity: quantity });
    }
    updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.deleteCartItem = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    }) //filter method is to retrieve the condition items
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.removeCart = function () {
    this.cart.items = [];
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const getDb = require('../util/database').getDb;
// const mongoDb = require('mongodb');

// class User {
//     constructor(name, email, cart, id) {
//         this.name = name;
//         this.email = email;
//         this.cart = cart; // {items: []}
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this)
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     addToCart(product) {
//         const db = getDb();
//         let updatedCart;
//         if (this.cart == undefined) {
//             updatedCart = { items: [{ productId: new mongoDb.ObjectId(product._id), quantity: 1 }] };
//         }
//         else {
//             const cartProductIndex = this.cart.items.findIndex(cp => {
//                 return cp.productId.toString() == product._id.toString();
//             }) // findIndex return first element in the object
//             let quantity = 1;
//             const updatedCartItems = [...this.cart.items];
//             if (cartProductIndex >= 0) {
//                 let updatedQuantity = this.cart.items[cartProductIndex].quantity + 1;
//                 updatedCartItems[cartProductIndex].quantity = updatedQuantity;
//             }
//             else {
//                 updatedCartItems.push({ productId: product._id, quantity: quantity });
//             }
//             updatedCart = { items: updatedCartItems };
//         }

//         return db.collection('users').updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users').findOne({ _id: new mongoDb.ObjectId(userId) })
//             // .next() //findOne method search only one data,so don't need next function
//             .then(user => {
//                 return user;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     getCart() {
//         const db = getDb();
//         if (this.cart == undefined) {
//             return db.collection('users').updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: { cart: { items: [] } } });
//             let products = [];
//             return products;
//         }
//         else {
//             const productIds = this.cart.items.map(item => {
//                 return item.productId;
//             }) //map is seperate a arrays to one array
//             return db.collection('products').find({ _id: { $in: productIds } }).toArray() // in is use for the multiple data 
//                 .then(products => {
//                     return products.map(p => {
//                         return {
//                             ...p, quantity: this.cart.items.find(item => {
//                                 return item.productId.toString() === p._id.toString();
//                             }).quantity
//                         }
//                     })
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         }
//     }
//     deleteCartItem(productId) {
//         const db = getDb();
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         })
//         return db.collection('users').updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } })
//     }
//     addOrders() {
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: this._id,
//                         name: this.name
//                     }
//                 };
//                 return db.collection('orders').insertOne(order);
//             })
//             .catch(err => {
//                 console.log(err);
//             }).then(result => {
//                 return db.collection('users').updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: { cart: { items: [] } } })
//             })
//     }
//     getOrders() {
//         const db = getDb();
//         return db.collection('orders').find({ _id: new mongoDb.ObjectId('this._id') }).toArray()
//             .then(orders => {
//                 return orders;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

// }

// module.exports = User; 