'use strict';

export default function(Highscore) {
  let User;
  let Game;

  // TimeFrame Methoden aktivieren
  Highscore.on('attached', (app) => {
    User = app.models.user;
    Game = app.models.game;
  });

  // Save Highscore
  Highscore.saveHighscore = function(p_data, callback) {
    let response = {
      success: false
    };

    let highscore = p_data.game_summary;
    highscore.finished_at = new Date();
    highscore.game_id = p_data.game_id;
    highscore.user_id = p_data.user.user_id;

    Highscore.create(highscore, (err, res) => {
      if(err){
        console.log(err);
      }
      if(res){
        User.updateUser(p_data.user, (err, res) => {
          if(res.success) response.success = true;
          callback(null, response);
        });
      } else {
        callback(null, response);
      }
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

  // Get all highscores for specific game
  Highscore.getAllHighscoresForSpecificGame = function(p_data, callback) {
    let response = { success: false };
    let filter = {
      where: { game_id: p_data.game_id },
      order: ['reached_score DESC', 'maximum_score DESC'],
      limit: 30
    };
    let r_highscore_arr = [];
    Highscore.find(filter, (err, res_highscore) => {
      if(res_highscore) {
        if(res_highscore.length > 0) {
          res_highscore.forEach((h, index) => {
            let r_highscore_obj = {};
            r_highscore_obj.game_id = h.game_id;
            r_highscore_obj.user_id = h.user_id;
            r_highscore_obj.reached_score = h.reached_score;
            r_highscore_obj.maximum_score = h.maximum_score;
            r_highscore_obj.answers_wrong = h.answers_wrong;
            r_highscore_obj.answers_correct = h.answers_correct;
            User.getById(h.user_id).then((res_user) => {
              r_highscore_obj.user = res_user;
              r_highscore_arr.push(r_highscore_obj);
              if(index === res_highscore.length - 1){
                response.success = true;
                response.highscores = r_highscore_arr;
                callback(null, response);
              }
            });
          });
        } else {
          response.highscores = r_highscore_arr;
          callback(null, response);
        }
      } else {
        callback(null, response);
      }
    });
  };

  Highscore.remoteMethod('getAllHighscoresForSpecificGame', {
    http: { path: '/getAllHighscoresForSpecificGame', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Get all data to show on highscore main page
  Highscore.getAllDataForHighscorePage = function(p_data, callback) {
    let response = {
      success: false,
      data: {}
    };

    // Find best user for all games
    User.getBestUsers((err,res) => {
      if(res) {
        response.data.bestUsers = res.bestUsers;
        // Find all users for games you contribut to
        Game.getAllGamesForStartpage(p_data, (err, res) => {
          response.success = true;
          response.data.games = {
            ownGames: res.ownGames,
            contributingGames: res.contributingGames
          };
          callback(null, response);
        })
      } else {
        callback(null, response);
      }
    })
  };

  Highscore.remoteMethod('getAllDataForHighscorePage', {
    http: { path: '/getAllDataForHighscorePage', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });
};
