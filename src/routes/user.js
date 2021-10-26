const express = require('express');
const router = express.Router();

const path = require ('path');
const multer = require ('multer');



// Configuración multer
const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, './public/avatars');
    },
    filename: (req, file, cb) => {
        console.log(file)
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, filename )
    }
});

const uploadFile = multer ({storage});

const { body } = require ('express-validator') //funciona igual que el check, pero lo que estamos validando es algo que está en el body

const validations = [
    body('fullname').notEmpty().withMessage('Debés ingresar nombre y apellido'),
    body('email')
        .notEmpty().withMessage('Debés ingresar e-mail').bail()
        .isEmail().withMessage('Debés ingresar formato de e-mail válido'),
    body('password').notEmpty().withMessage('La contraseña debe tener como mínimo 8 caracteres, 2 números, 1 carácter especial, 1 letra mayúsucla y 1 minúscula'),
    body('repassword').notEmpty().withMessage('Reingresar contraseña'),
    body('avatar').custom((value,{ req })=>{
        let file = req.file;
        let acceptedExtensions = ['.jpg','.png','.jpng']
        
        if (!file) {
            throw new Error('Tienes que subir una imágen');
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }


        return true
    })
]

// Requerir controlador
const controller = require('../controllers/userController');

// Formulario de registro   
router.get('/register', controller.register);

// Procesar el registro
router.post('/register',uploadFile.single('avatar'),validations, controller.processRegister)


// Formulario de login
router.get('/login', controller.login);
router.post('/login', (req,res)=>{
    res.send('Ya te logueaste campeón');
});

module.exports = router;


