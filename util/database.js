const mongoDb = require('mongodb');

const MongoClient = mongoDb.MongoClient;

let _db;

// Connection with mongodb

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Yabuto:Yabuto[6101997]@cluster0-t9d6d.mongodb.net/shop')
        .then(client => {
            console.log("connected");
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database Found';
}

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;