'use strict';

export default function(Game) {
  let TimeFrame;

  // TimeFrame Methoden aktivieren
  Game.on('attached', (app) => {
    TimeFrame = app.models.time_frame;
  });

  // Create Game
  Game.createGame = function(p_data, callback) {
    let response = {
      success: false
    };
    let game = p_data.game;
    let user = p_data.user;
    let game_to_save = {
      name: game.name,
      description: game.description,
      creator: game.creator,
      challenged: game.challenged
    };
    Game.create(game_to_save, (err, res) => {
      if(res){
        game.game_id = res.game_id;
        // Time-Frame sichern, falls vorhanden
        if(game.challenged){
          TimeFrame.createTimeframe({ game: game, user: user }, (err, res) => {
            if(res.success){
              response.success = true;
              response.game_id = game.game_id;
            }
            callback(null, response);
          });
        } else {
          response.success = true;
          response.game_id = game.game_id;
          callback(null, response);
        }
      } else {
        callback(null, response);
      }
    });
  };

  Game.remoteMethod('createGame', {
    http: { path: '/createGame', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Get all games for start page
  Game.getAllGamesForStartpage = function(p_data, callback) {
    let response = {
      success: false
    };

    //callback(null, response);

    // Get own gamges
    Game.getOwnGames(p_data, (err, res) => {
      response.ownGames = res.games;
      // Contributing games
      Game.getContributingGames(p_data, (err, res) => {
        response.contributingGames = res;
        // Challenged games
        Game.getChallengedGames(p_data, (err, res) => {
          response.challengedGames = res;
          response.success = true;
          callback(null, response);
        })
      })
    });
  };

  Game.remoteMethod('getAllGamesForStartpage', {
    http: { path: '/getAllGamesForStartpage', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  Game.getContributingGames = function(p_data, callback){
    // TODO: Implement
    let response = null;
    callback(null, response);
  };

  Game.getChallengedGames = function(p_data, callback){
    // TODO: Implement
    let response = null;
    callback(null, response);
  };

  // Get own Games
  Game.getOwnGames = function(p_data, callback) {
    let response = {
      success: false,
      games: null
    };

    Game.find({where: {creator: p_data.user_id}}, (err, res_games) => {
      if(res_games){
        response.success = true;
        if(res_games.length > 0){
          // Checking index, to check if loop is completed
          res_games.forEach((game, index) => {
            // Load time frames for challenged games
            if(game.challenged){
              Game.getTimeFrameForGame(game).then((result) => {
                game.time_frame = {
                  from: result.from,
                  to: result.to
                };
                if(index === res_games.length - 1){
                  response.games = res_games;
                  callback(null, response);
                }
              });
            } else {
              if(index === res_games.length - 1){
                response.games = res_games;
                callback(null, response);
              }
            }
          });
        } else {
          callback(null, response);
        }
      } else {
        callback(null, response);
      }
    })
  };

  Game.remoteMethod('getOwnGames', {
    http: { path: '/getOwnGames', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Edit Game
  Game.editGame = function(p_data, callback) {
    let response = {
      success: false
    };

    let game = p_data.game;

    Game.upsert(game, (err, res) => {
      if(res){
        response.game = res;
        if(game.challenged){
          game.time_frame.game_id = p_data.game.game_id;
          let data = {
            time_frame: game.time_frame
          };
          TimeFrame.updateTimeframe(data, (err, res) => {
            if(res.success){
              response.success = true;
              response.game.time_frame = res.time_frame;
            }
            callback(null, response);
          })
        } else {
          response.success = true;
          callback(null, response);
        }
      } else {
        callback(null, response);
      }
    })
  };

  Game.remoteMethod('editGame', {
    http: { path: '/editGame', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Delete Game
  Game.deleteGame = function(p_data, callback) {
    let response = {
      success: false
    };

    Game.deleteById(p_data.game_id, (err, res) => {
      if(res) {
        response.success = true;
        callback(null, response);
      }
    })
  };

  Game.remoteMethod('deleteGame', {
    http: { path: '/deleteGame', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  /* -------------------------------------------- Interne Methoden -------------------------------------------- */

  Game.getTimeFrameForGame = function(p_game) {
    return new Promise(resolve => {
      TimeFrame.getTimeFrameById(p_game.game_id, (err, res) => {
        if(res){
          resolve(res);
        }
      })
    })
  }
};
