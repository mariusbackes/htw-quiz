/**
 * Service file for user management
 */

'use strict';

let userDao = require('../dao/UserDao');

exports.register = (req, res) => {
    let user_data = [
        req.body.username, 
        req.body.email,
        req.body.first_name, 
        req.body.last_name, 
        req.body.password, ];
    //res.send(userDao.register(user_data));
    res.send(JSON.stringify(req.body));
};

exports.login = (req, res) => {
    res.send({function: 'login'});
};

exports.change_password = (req, res) => {
    res.send({function: 'change_password'});
};

exports.change_email = (req, res) => {
    res.send({function: 'change_email'});
};

exports.change_name = (req, res) => {
    res.send({function: 'change_name'});
};

// Generiert einen zufälligen Salt mit fester Länge. Wird für den Hash des Passworts verwendet
function generateSalt(){
    return "";
}

// Hashed das angegebene Passwort, mit einem Salt
function hashPassword(){

}