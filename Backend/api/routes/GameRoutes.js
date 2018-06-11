/**
 * Route-File for game management
 */

'use strict';

module.exports = function(app) {
    let gameService = require('../services/GameService');

    app.route('/game/create_question_catalog')
        .post(gameService.create_question_catalog);

    app.route('/game/edit_question_catalog')
        .post(gameService.edit_question_catalog);

    app.route('/game/delete_question_catalog')
        .post(gameService.delete_question_catalog);

    app.route('/game/share_question_catalog')
        .post(gameService.share_question_catalog);

    app.route('/game/start_game')
        .post(gameService.start_game);

    app.route('/game/join_game')
        .post(gameService.join_game);

    app.route('/game/show_results')
        .post(gameService.show_results);
}