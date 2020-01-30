const fs = require('fs');

const path = require('path');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json'); // retreive app.js file name
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            console.log(products);
            products.push(this);
            console.log(products);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    return [];
                }
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json'); // retreive app.js file name

        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
}