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
          console.log("challenged");
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
};
