const path = require('path');
const fs = require('fs');

/* Logica para traer los productos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../db/products.json'), 'utf-8');
let productsList = JSON.parse(jsonProducts)


let controller = {
    home: (req,res) => {
        res.render('home',{productsList});
    }
}

module.exports = controller;



