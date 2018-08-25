'use strict';

export default function(Game) {
  let TimeFrame;
  let Contributors;

  // TimeFrame Methoden aktivieren
  Game.on('attached', (app) => {
    TimeFrame = app.models.time_frame;
    Contributors = app.models.contributors;
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

  // Get all games for editing page
  Game.getAllGamesForEditpage = function(p_data, callback) {
    let response = {
      success: false
    };

    // Get own gamges
    Game.getOwnGames(p_data, (err, res) => {
      response.ownGames = res.games;
      // Contributing games
      Game.getContributingGames(p_data, (err, res) => {
        response.contributingGames = res;
        response.success = true;
        callback(null, response);
      })
    });
  };

  Game.remoteMethod('getAllGamesForEditpage', {
    http: { path: '/getAllGamesForEditpage', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Get all games for start page
  Game.getAllGamesForStartpage = function(p_data, callback) {
    let response = {
      success: false
    };

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
    let response = null;
    let games_array = [];
    Contributors.getContributionsForUser(p_data.user_id, (err, res) => {
      if(res.success){
        let contributing_games = res.contributing_games;
        contributing_games.forEach((cg, index) => {
          Game.findById(cg.game_id, (err, res) => {
            games_array.push(res);
            if(index === contributing_games.length - 1){
              Game.collectGameInformation(games_array).then((result) => {
                response = result;
                callback(null, response);
              })
            }
          });
        });
      } else {
        callback(null, response);
      }
    });
  };

  Game.getChallengedGames = function(p_data, callback){
    let response = null;
    let filter = { where: { challenged: true }};
    let current_challenged_games = [];

    Game.find(filter, (err, res) => {
      if(res && res.length > 0){
        Game.collectGameInformation(res).then((games) => {
          games.forEach((game, index) => {
            let current = new Date();
            let from = new Date(game.time_frame.from);
            let to = new Date(game.time_frame.to);

            if(from < current && current < to){
              current_challenged_games.push(game);
            }

            if(index === games.length - 1){
              response = current_challenged_games;
              callback(null, response);
            }
          });
        })
      } else {
        callback(null, response);
      }
    })
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
          Game.collectGameInformation(res_games).then((games) => {
            response.games = games;
            callback(null, response);
          })
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

  Game.collectGameInformation = function(games) {
    return new Promise((resolve) => {
      games.forEach((game, index) => {
        // Load time frames for challenged games
        if(game.challenged){
          Game.getTimeFrameForGame(game).then((result) => {
            game.time_frame = {
              from: result.from,
              to: result.to,
              invitation_code: result.invitation_code
            };
            if(index === games.length - 1){
              resolve(games);
            }
          }).catch((err) => {
            console.log(err);
          });
        } else {
          if(index === games.length - 1){
            resolve(games);
          }
        }
      });
    })
  };

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

  Game.getById = function(p_game_id, callback){
    Game.findById(p_game_id, (err, res) => {
      callback(null, res);
    });
  };

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
