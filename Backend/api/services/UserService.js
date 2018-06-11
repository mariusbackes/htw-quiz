/**
 * Service file for user management
 */

'use strict';

exports.register = function(req, res) {
    res.send({function: 'register'});
};

exports.login = function(req, res) {
    res.send({function: 'login'});
};

exports.change_password = function(req, res) {
    res.send({function: 'change_password'});
};

exports.change_email = function(req, res) {
    res.send({function: 'change_email'});
};

exports.change_name = function(req, res) {
    res.send({function: 'change_name'});
};