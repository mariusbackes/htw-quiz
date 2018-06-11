/**
 * Service file for highscore management
 */

'use strict';

exports.get_highscore = (req, res) => {
    res.send({function: 'get_highscore'});
};

exports.update_highscore = (req, res) => {
    res.send({function: 'update_highscore'});
};