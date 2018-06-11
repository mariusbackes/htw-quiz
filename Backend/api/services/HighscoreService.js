/**
 * Service file for highscore management
 */

'use strict';

exports.get_highscore = function(req, res) {
    res.send({function: 'get_highscore'});
};

exports.update_highscore = function(req, res) {
    res.send({function: 'update_highscore'});
};