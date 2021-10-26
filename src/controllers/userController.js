const path = require('path');

const { validationResult } = require ('express-validator')
// Debemos capturar las validaciones. Requrimos la funcion validation result y 
// espera que le pase el request con las reglas de validacion
// y me dirá que campos tuvieron error. VALIDATION RESULT ES UNA FUNCIÓN DE EXPRESS VALIDATOR


let controller = {
    register: (req,res) => {
        res.render('register');
    },
    login: (req,res) => {
        res.render('login');
    },
    processRegister: (req,res) => {
        const resultValidation = validationResult(req);//es un objeto literal que tiene dentro la propiedad errors que es un array
        //res.send(resultValidation)
        
        if (resultValidation.errors.length>0) {
            return res.render('register', {
                errors: resultValidation.mapped(), //convierte el array en un objeto literal
                oldData: req.body
            })
        }

        res.render('/');
        
    }
}

module.exports = controller;
