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
            }
            callback(null, response);
          });
        } else {
          response.success = true;
          callback(null, response);
        }
      } else {
        callback(null, response);
      }
    });
  };

  Game.remoteMethod('createGame', {
    http: { path: '/createGame', verb: 'post' },
    accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Get Games
  Game.getGames = function(p_data, callback) {
    let response = {
      success: false
    };

    Game.find({where: {creator: p_data.user_id}}, (err, res_games) => {
      if(res_games){
        response.success = true;
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
                callback(null, response)
              }
            });
          }
        });
      }
    })
  };

  Game.remoteMethod('getGames', {
    http: { path: '/getGames', verb: 'post' },
    accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Edit Game
  Game.editGame = function(p_data, callback) {
    let response = {
      success: false
    };

    Game.find({where: {game_id: p_data.game_id}}, (err, result) => {
      if(result){
        let saved_game = result[0];
        if(saved_game.challenged && !p_data.challenged){
          // TODO: TimeFrame entfernen
        } else if(!saved_game.challenged && p_data.challenged){
          // TODO: Neuen TimeFrame zum Spiel speichern
        } else if(saved_game.challenged && p_data.challenged){
          // TODO: Game und TimeFrame updaten
        } else {
          // TODO: Normales Update
        }
      }
    })
  };

  Game.remoteMethod('editGame', {
    http: { path: '/editGame', verb: 'post' },
    accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
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
    accepts: { arg: 'user', type: 'object', http: { source: 'body' } },
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
