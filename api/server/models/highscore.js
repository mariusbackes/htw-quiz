'use strict';

export default function(Highscore) {
  // Save Highscore
  Highscore.saveHighscore = function(p_data, callback) {
    let response = {
      success: false
    };

    let highscore = p_data.game_summary;
    highscore.finished_at = new Date();
    highscore.game_id = p_data.game_id;
    highscore.user_id = p_data.user_id;

    Highscore.create(highscore, (err, res) => {
      if(res){
        response.success = true;
      }
      callback(null, response);
    });
  };

  Highscore.remoteMethod('saveHighscore', {
    http: { path: '/saveHighscore', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Get your own highscores for all games
  Highscore.getOwnHighscoresForAllGames = function(p_data, callback) {
    let response = {
      success: false
    };

    Highscore.find({where: {user_id: p_data.user_id}}, (err, res) => {
      if(res){
        // TODO: Find Infos to game (name, description etc)
        response.success = true;
        response.highscores = res;
      }
      callback(null, response);
    });
  };

  Highscore.remoteMethod('getOwnHighscoresForAllGames', {
    http: { path: '/getOwnHighscoresForAllGames', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Get all your own highscores for specific game
  Highscore.getOwnHighscoresForSpecificGame = function(p_data, callback) {
    let response = {
      success: false
    };

    // TODO: Order results
    let where = { where: 
      { and: [
        {user_id: p_data.user_id}, 
        {game_id: p_data.game_id}
        ]
      }
    };

    Highscore.find(where, (err, res) => {
      if(res){
        response.success = true;
        response.highscores = res;
      }
      callback(null, response);
    });
  };

  Highscore.remoteMethod('getOwnHighscoresForSpecificGame', {
    http: { path: '/getOwnHighscoresForSpecificGame', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Get all your own highscores for specific game
  Highscore.getAllHighscoresForSpecificGame = function(p_data, callback) {
    let response = {
      success: false
    };

    // TODO: Order results

    Highscore.find({where: {game_id: p_data.game_id}}, (err, res) => {
      if(res){
        // TODO: Get infos about user, game etc
        response.success = true;
        response.highscores = res;
      }
      callback(null, response);
    });
  };

  Highscore.remoteMethod('getAllHighscoresForSpecificGame', {
    http: { path: '/getAllHighscoresForSpecificGame', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });
};
