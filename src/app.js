const express = require ('express');
const path = require ('path');
const session = require ('express-session'); //todo aquello que se guarda del lado del servidor
const cookies = require ('cookie-parser'); //todo aquello que se guarda del lado del cliente/navegador
//const methodOverride = require('method-override');

const app = express ();

//config tempalte
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

//config express
app.use(express.static(path.resolve(__dirname,'../public')));

//app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false })); //Permite captuar la información que se envía desde un formulario vía post
app.use(express.json());

//config session
app.use(session({
    secret:'Shhh, its a secret',
    resave: false,
    saveUninitialized: false,
}))

//middleware de aplicación. Este middlware va despues de se inicialice la sesión
const userLoggedMiddleware = require ('./middlewares/userLoggedMiddleware')

app.use(cookies());//esto me permite trabajar con cookie en req y res con un objeto literal

app.use(userLoggedMiddleware);

//config routes
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user')
const productRouter = require('./routes/products')

app.use('/', mainRouter);
app.use('/users', userRouter)
app.use('/products', productRouter)



app.listen( process.env.PORT || 3000  , () => console.log('Server corriendo en el puerto 3000'))
