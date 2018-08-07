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
};
