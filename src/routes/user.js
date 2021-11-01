const express = require('express');
const router = express.Router();

// Requerir controlador
const controller = require('../controllers/userController');

// Requerir Middlewares
const uploadFile = require('../middlewares/multerUsersMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de registro   
router.get('/register', guestMiddleware, controller.register);

// Procesar el registro
router.post('/register',uploadFile.single('avatar'),validations, controller.processRegister)


// Formulario de login
router.get('/login', guestMiddleware, controller.login);

// Procesar el login
router.post('/login', controller.loginProcess);


// Perfil de Usuario
router.get('/profile', authMiddleware, controller.profile);

// Logout
router.get('/logout', controller.logout);


module.exports = router;


