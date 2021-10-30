const path = require('path');
const fs = require('fs');

/* Logica para traer los productos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../db/products.json'), 'utf-8');
let productsList = JSON.parse(jsonProducts)


let controller = {
    home: (req,res) => {
        let visited = [];
        let insale = [];

        productsList.forEach(product => {
            if (product.category == 'in-sale') {
                insale.push(product);
            } else {
                visited.push(product)
            }
        });

        res.render('home',{insale, visited});
    }
}

module.exports = controller;


