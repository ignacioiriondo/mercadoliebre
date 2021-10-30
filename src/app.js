const express = require ('express');
const app = express ();
const path = require ('path');
const session = require ('express-session');
//const methodOverride = require('method-override');


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


//config routes
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user')

app.use('/', mainRouter);
app.use('/users', userRouter)


app.listen( process.env.PORT || 3000  , () => console.log('Server corriendo en el puerto 3000'))
