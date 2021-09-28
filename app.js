const express = require ('express');
const path = require ('path');

const app = express ();

/*config public*/
//static es un metodo dentro de expres. Lo que hacemos con esto es DISPONIBILIZAR  publicamente para el front, 
//la carpeta desde el navegador
//creamos una ruta absoluta
app.use(express.static(path.resolve(__dirname,'public')));

/*Routes*/

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/home.html'));
});

app.get('/register', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/register.html'));
});

app.get('/login', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/login.html'));
});

app.post('/register', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/home.html'));
});

app.post('/login', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/home.html'));
});



app.listen( process.env.PORT || 3000  , () => console.log('Server corriendo en el puerto 3000'))
