// es un middleware de aplicación ya que el header aparece en todas las vistas

const User = require('../models/User');

function userLoggedMiddleware (req ,res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;  
    let userFromCookie = User.findByField('email', emailInCookie);
    
    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    }

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        //paso lo que tengo en sesión a una variable global para poder llevarlo a la vista
        res.locals.userLogged = req.session.userLogged;
    }

    //traigo a la cookie
 

    next();
}

module.exports = userLoggedMiddleware