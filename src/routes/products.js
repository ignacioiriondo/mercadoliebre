const express = require('express');
const router = express.Router();

//Requerir controlador
const controller = require('../controllers/productController');

// Requerir Middlewares
const uploadFile = require('../middlewares/multerProductMiddleware');





//Formulario creación productos
router.get('/create', controller.create);

//Procesar formulario de creación de productos
router.post('/create',uploadFile.single('image'), controller.store);


module.exports = router;