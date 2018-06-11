/**
 * Route-File for user management
 */

'use strict';

module.exports = function(app) {
    let userService = require('../services/UserService');

    app.route('/user/register')
        .post(userService.register);

    app.route('/user/login')
        .post(userService.login);

    app.route('/user/change_password')
        .post(userService.change_password);

    app.route('/user/change_email')
        .post(userService.change_email);

    app.route('/user/change_name')
        .post(userService.change_name);
}