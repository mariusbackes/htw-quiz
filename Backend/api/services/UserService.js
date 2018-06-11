/**
 * Service file for user management
 */

'use strict';

const bcrypt = require('bcrypt');
const userDao = require('../dao/UserDao');

exports.register = (req, res) => {
    hashPassword(req.body.password).then((hash) => {
        let user_data = [
            [req.body.username, req.body.email, req.body.first_name, req.body.last_name, hash]
        ];
        userDao.register(user_data).then((return_value) => {
            res.send(return_value);
        })
    });
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

// Hashed das angegebene Passwort, mit einem Salt
function hashPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            resolve(hash);
        });
    }) 
}