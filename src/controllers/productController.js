const path = require('path');
const fs = require('fs');

/* Logica para traer los productos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../db/products.json'), 'utf-8');
let productsList = JSON.parse(jsonProducts)

//Genero nuevo ID para el producto creado
const nuevoId = () => {
    let ultimo = 0;
    productsList.forEach(product => {
        if (product.id > ultimo) {
            ultimo = product.id;
        }
    });
    return ultimo + 1;
}


//Controller
let controller = {
    create: (req, res) => {
        res.render('products/create');
    },

    store (req, res) {
        let product = {
            id: nuevoId(),
            ...req.body,
            image: req.file.filename
        }

        productsList.push(product);

        let jsonDeProductos = JSON.stringify(productsList, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../db/products.json'), jsonDeProductos);
        
        return res.redirect('/');
    }
}

module.exports = controller;