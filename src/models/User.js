// 1. Guardar al usuario en la DB
// 2. Buscar al usuario que se quiere loguear por su email
// 3. Buscar a un usuario por su ID
// 4. Editar la información de un usuario
// 5. Eliminar a un usuario de la DB

// CRUD

const fs = require('fs')
const path = require('path')

const User = {
    //trae la ruta de users.json
    fileName: '../db/users.json',

    getData: function (){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../db/users.json'), 'utf-8'));
    },

    //genera el ID cuando crea el usuario nuevo
    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        //Debemos preveer el caso en que el users.json esté vacío ==> Cuando esté vacío, poner array vacío []
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },
    
    // trae a todos los usuarios
    findAll: function () {
        return this.getData();
    },


    // Pk: Primary key. Buscar usuario. Los tengo en formato de array. Viene del findaAll
    findByPk: function (id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;

    },

    // Metodo que trae por findByField. Por cualquier campo
    findByField: function (field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;

    },

    // guardar un usuario
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData //spread operator. Me da toda la info que vino por "userData"
        }
        allUsers.push(newUser);
        let allUsersJson = JSON.stringify(allUsers, null, 4)
        fs.writeFileSync(path.resolve(__dirname,this.fileName), allUsersJson);
        return newUser;
    },

    // metodo que borra un usuario de acuerdo al id que le pasemos
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        let finalUsersJson = JSON.stringify(finalUsers, null, 4)
        fs.writeFileSync(path.resolve(__dirname,this.fileName), finalUsersJson);
        return true;
    }
}


module.exports = User;

