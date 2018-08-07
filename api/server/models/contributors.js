'use strict';

export default function(Contributors) {

  Contributors.createContributor = function(p_data, callback){
    let response = {
      success: false
    };
    let user = p_data.user;
    let game = p_data.game;
    let contributor = p_data.contributor;

    if (game.game_id == contributor.game_id && game.creator == user.user_id)
    {
      Contributers.upsert(contributor, (err, res) => {
          if(res) {
              response.success = true;
              response.contributor = res;
          }
          callback(null, response);
      });
    }
  };

  Contributors.remoteMethod('createContributor', {
      http: { path: '/createContributor', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });

  Contributors.deleteContributor = function(p_data, callback){
    let response = {
      success: false
    };
    let user = p_data.user;
    let game = p_data.game;
    let contributor = p_data.contributor;

    if (game.game_id == contributor.game_id && game.creator == user.user_id) {
      Contributors.destroy((err, res) => {
        if(res){
          response.success = true;
          callback(null, response);
        }
      });
    }
  };

  Contributors.remoteMethod('deleteContributor', {
      http: { path: '/deleteContributor', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });
};
