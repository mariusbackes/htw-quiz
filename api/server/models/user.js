'use strict';

import bcrypt from 'bcrypt';

// Konstanten
const saltRounds = 10;
const user_fields =  {
  completed_games: true,
    reached_points: true,
    username: true,
    first_name: true,
    last_name: true,
};

export default function(User) {
    // Login
    User.login = function(p_user, callback) {
      let response = {
          success: false
      };
      User.find({where: {email: p_user.email}}, (err, results) => {
        if(results.length > 0){
          User.checkCredentials(results[0].user_id, p_user.password).then((data) => {
            response.success = data.success;
            response.user = results[0];
            response.user.password = p_user.password;
            callback(null, response);
          });
        } else {
          callback(null, response);
        }
      });
    };

    User.remoteMethod('login', {
        http: { path: '/login', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Passwort des Nutzers ändern
    User.changePassword = function(p_data, callback) {
        let response = {
            success: false
        };
        User.checkCredentials(p_data.user.user_id, p_data.old_password).then(data => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(p_data.new_password, salt, function(err, hash) {
                    p_data.user.password = hash;
                    User.upsert(p_data.user, (err, res) => {
                        if(res) response.success = true;
                        callback(null, response);
                    });
                });
            });
        })
    };

    User.remoteMethod('changePassword', {
        http: { path: '/changePassword', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Email des Nutzers ändern
    User.changeEmail = function(p_data, callback){
        let response = {
            success: false
        };

        User.checkCredentials(p_data.user.user_id, p_data.user.password).then(data => {
          p_data.user.email = p_data.new_email;
          p_data.user.password = data.user_password;
          User.upsert(p_data.user, (err, res) => {
              if(res) response.success = true;
              callback(null, response);
          });
        })
    };

    User.remoteMethod('changeEmail', {
        http: { path: '/changeEmail', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Username des Nutzers ändern
    User.changeUsername = function(p_data, callback){
        let response = {
            success: false
        };
        User.checkCredentials(p_data.user.user_id, p_data.user.password).then((data) => {
          p_data.user.username = p_data.new_username;
          p_data.user.password = data.user_password;
          User.upsert(p_data.user, (err, res) => {
            if(res) response.success = true;
            callback(null, response);
          });
        });
    };

    User.remoteMethod('changeUsername', {
        http: { path: '/changeUsername', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Methode zum Löschen eines Nutzers
    User.deleteUser = function(p_data, callback){
        let response = {
            success: false
        };
        User.checkCredentials(p_data.user_id, p_data.password).then(data => {
          //if(data.success){
            User.destroyById(p_data.user_id, (err, res) => { //alternativ p_user.destroy();
              if(res) {
                response.success = res.count > 0;
              }
              callback(null, response);
            });
          //}
          //callback(null, response);
        })
    };

    User.remoteMethod('deleteUser', {
      http: { path: '/deleteUser', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
    });

    //Methode zum Anlegen eines Nutzers
    User.registerUser = function(p_user, callback){
        let response = {
            success: false
        };
        let user = {
            username: p_user.username,
            email: p_user.email,
            password: p_user.password,
            first_name: p_user.first_name,
            last_name: p_user.last_name,
            registered_at: new Date(),
            last_login: new Date(),
            completed_games: 0,
            reached_points: 0,
            admin: false
        };
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                User.create(user, (err, res) => {
                    if(res) {
                      response.success = true;
                      response.user_id = res.user_id;
                      response.registered_at = user.registered_at;
                      response.last_login = user.last_login;
                    }
                    callback(null, response);
                });
            });
        });
    };

    User.remoteMethod('registerUser', {
        http: { path: '/registerUser', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    // Find user by email
    User.searchForUser = function(p_data, callback) {
      let response = {
          success: false
      };
      User.find({where: {email: p_data.email}}, (err, results) => {
        if(results.length > 0){
          response.user_id = results[0].user_id;
          response.first_name = results[0].first_name;
          response.last_login = results[0].last_name;
          response.success = true;
        }
        callback(null, response);
      });
    };

    User.remoteMethod('searchForUser', {
      http: { path: '/searchForUser', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
    });

    User.updateUser = function(p_data, callback){
      let response = {
        success: false
      };

      User.checkCredentials(p_data.user_id, p_data.password).then((data) => {
        p_data.password = data.user_password;
        User.upsert(p_data, (err, res) => {
          if(res) response.success = true;
          callback(null, response);
        });
      });
    };

    User.getBestUsers = function(callback){
      let response = {
        success: false
      };

      let filter = {
        fields: user_fields,
        order:['reached_points DESC', 'completed_games DESC'],
        limit: 5
      };

      User.find(filter, (err,res) => {
        if(res) {
          response.success = true;
          response.bestUsers = res;
        }
        callback(null, response);
      })
    };

    User.getById = function(p_user_id){
      return new Promise(resolve => {
        User.findById(p_user_id, {fields: user_fields}, (err, res) => {
          resolve(res);
        });
      });
    };

    /* -------------------------------------------- Interne Methoden -------------------------------------------- */

    // Password des Nutzers überprüfen
    User.checkCredentials = function(p_user_id, p_password){
        let response = {
            success: false
        };

        return new Promise((resolve, reject) => {
            User.findById(p_user_id, (err, user) => {
                if(err){
                    resolve(response);
                }
                if(user) {
                    bcrypt.compare(p_password, user.password, (err, res) => {
                        response.success = res;
                        response.user_password = user.password;
                        resolve(response);
                    })
                } else {
                    resolve(response);
                }
            })
        })
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
};
