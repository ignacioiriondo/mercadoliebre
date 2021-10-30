
const path = require('path');
const { body } = require ('express-validator')


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


module.exports = validations;



