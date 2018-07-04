'use strict';

import bcrypt from 'bcrypt';
import * as user_dao from '../dao/user.dao';

// Konstanten
const saltRounds = 10;

export default function(User) {
    // Login
    User.login = function(user, callback) {
        let response = {
            success: false
        };
        response.user = user;
        User.checkCredentials(user.email, user.password).then((data) => {
            response.success = data;
            callback(null, response);
        });
    };

    // Vor dem registrieren das Passwort verschlüsseln
    User.observe('before save', (context, next) => {
        if (context.isNewInstance) {
            var user = context.instance;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    user.password = hash;
                    next();
                });
            });
        }
    });

    // Password des Nutzers überprüfen
    User.checkCredentials = function(email, password){
        let hashed_password = '';

        return new Promise((resolve, reject) => {
            user_dao.getPasswordHash(email).then(response => {
                hashed_pas  sword = response;
                bcrypt.compare(password, hashed_password, (err, res) => {
                    resolve(res);
                }).catch(err => {
                    console.log(err);
                });
            });
        })
    };
    
    // Eigene entfernte Methoden
    User.remoteMethod(
        'login', {
            http: { path: '/login', verb: 'post' },
            accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
            returns: { arg: 'response', type: 'object' }
        }
    );
};
