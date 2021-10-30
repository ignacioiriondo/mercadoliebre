//Autenticar que hay alguien sesión

function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/users/profile');
	}
	next();
}

module.exports = guestMiddleware;