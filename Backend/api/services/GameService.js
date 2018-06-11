/**
 * Service for game management
 */

'use strict';

exports.create_question_catalog = function(req, res) {
    res.send({function: 'register'});
};

exports.edit_question_catalog = function(req, res) {
    res.send({function: 'edit_question_catalog'});
};

exports.delete_question_catalog = function(req, res) {
    res.send({function: 'delete_question_catalog'});
};

exports.share_question_catalog = function(req, res) {
    res.send({function: 'share_question_catalog'});
};

exports.start_game = function(req, res) {
    res.send({function: 'start_game'});
};

exports.join_game = function(req, res) {
    res.send({function: 'join_game'});
};

exports.show_results = function(req, res) {
    res.send({function: 'show_results'});
};