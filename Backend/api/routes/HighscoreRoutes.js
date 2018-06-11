/**
 * Route-File for highscore management
 */

'use strict';

module.exports = function(app) {
    let highscoreService = require('api/services/HighscoreService');

    app.route('/highscore/get_highscore')
        .post(highscoreService.get_highscore);
        
    app.route('/highscore/update_highscore')
        .post(highscoreService.update_highscore);
}