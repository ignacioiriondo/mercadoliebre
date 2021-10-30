const bcryptjs = require ('bcryptjs')


const { validationResult } = require ('express-validator')
// Debemos capturar las validaciones. Requrimos la funcion validation result y 
// espera que le pase el request con las reglas de validacion
// y me dirá que campos tuvieron error. VALIDATION RESULT ES UNA FUNCIÓN DE EXPRESS VALIDATOR

const User = require ('../models/User.js')


let controller = {

    register: (req,res) => {
        res.render('register');
    },

    login: (req,res) => {
        res.render('login');
    },

    loginProcess: (req,res) => {
        
        let userToLogin = User.findByField('email',req.body.email);
        if (userToLogin){
            //queremos guardar al usuario en session
            
            
            req.session.userLogged = userToLogin;
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (passwordOk){
                return res.redirect('/users/profile')

            }
            return res.render ('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }
        return res.render ('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });

    },

    processRegister: (req,res) => {
        const resultValidation = validationResult(req);//es un objeto literal que tiene dentro la propiedad errors que es un array
        //res.send(resultValidation)
        
        if (resultValidation.errors.length>0) {
            return res.render('register', {
                errors: resultValidation.mapped(), //convierte el array en un objeto literal
                oldData: req.body
            });
        }
        // validación: buscar usuario por email en la base de datos
        let userInDb = User.findByField('email', req.body.email);
        if (userInDb) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        //crea el usuario y sobreescribe el users.json
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            repassword: bcryptjs.hashSync(req.body.repassword, 10),
            avatar: req.file.filename
        }


        return res.redirect('/');
        
    },
    profile: (req, res) => {
      	return res.render('userProfile',{
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/')
    }
}

module.exports = controller;
