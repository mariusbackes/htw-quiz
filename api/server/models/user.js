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
        //response.user = user;
        User.checkCredentials(user.email, user.password).then((data) => {
            response.success = data;
            callback(null, response);
        });
    };

    // Vor dem registrieren das Passwort verschlüsseln
    // User.observe('before save', (context, next) => {
    //     if (context.isNewInstance) {
    //         var user = context.instance;
    //         bcrypt.genSalt(saltRounds, function(err, salt) {
    //             bcrypt.hash(user.password, salt, function(err, hash) {
    //                 user.password = hash;
    //                 next();
    //             });
    //         });
    //     }
    // });

    // Password des Nutzers überprüfen
    User.checkCredentials = function(email, password){
        let hashed_password = '';

        return new Promise((resolve, reject) => {
            user_dao.getPasswordHash(email).then(response => {
                hashed_password = response;
                bcrypt.compare(password, hashed_password, (err, res) => {
                    resolve(res);
                }).catch(err => {
                    console.log(err);
                });
            });
        })
    };

    //Passwort des Nutzers ändern
    User.changePassword = function(user, password, newPassword) {
        let response = {
            success: false
        };
        User.checkCredentials(user.email, password).then(response => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(newPassword, salt, function(err, hash) {
                    user.password = hash;
                    user.password = password;
                    User.upsert(user, (err, res) => {
                        if(res) response.success = true;
                    });
                });
            });            
        })
    }

    //Email des Nutzers ändern
    User.changeEmail = function(user, password, newEmail){
        let response = {
            success: false
        };
        User.checkCredentials(user.email, password).then(response => {
            user.email = newEmail;
            User.upsert(user, (err, res) => {
                if(res) response.success = true;
            });
        })
    }

    //Username des Nutzers ändern
    User.changeUsername = function(user, password, newUsername){
        let response = {
            success: false
        };
        User.checkCredentials(user.email, password).then(response => {
            user.email = newEmail;
            User.upsert(user, (err, res) => {
                if(res) response.success = true;
            });
        })
    }

    //Methode zum Anlegen eines Nutzers
    User.registerUser = function(name, mail, pwd, fname, lname){
        let user = {
            username: name,
            email: mail,
            password: pwd,
            first_name:fname,
            last_name:lname,
            registered_at: new Date(),
            last_login: new Date(),
            completed_games: 0,
            reached_points: 0,
            admin: false
        }
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                User.create(user, (err, res) => {
                    if(res) response.success = true;
                });
            });
        });
    }
    

    // Eigene entfernte Methoden
    User.remoteMethod(
        'login', {
            http: { path: '/login', verb: 'post' },
            accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
            returns: { arg: 'response', type: 'object' }
        },
        'changePassword', {
            http: { path: '/changePassword', verb: 'post' },
            accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
            returns: { arg: 'response', type: 'object' }
        },
        'changeEmail', {
            http: { path: '/changeEmail', verb: 'post' },
            accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
            returns: { arg: 'response', type: 'object' }
        },
        'changeUsername', {
            http: { path: '/changeUsername', verb: 'post' },
            accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
            returns: { arg: 'response', type: 'object' }
        },
        'registerUser', {
            http: { path: '/registerUser', verb: 'post' },
            accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
            returns: { arg: 'response', type: 'object' }
        }
    );
};
