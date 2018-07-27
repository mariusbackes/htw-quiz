'use strict';

export default function(Contributors) {

  Contributors.createContributer = function(p_data, callback){
    let user = p_data.user;
    let game = p_data.game;
    let contributer = p_data.contributer;

    if (game.game_id == contributer.game_id && game.creator == user.user_id)
    {
        Contributers.upsert(contributer, (err, res) => {
            if(res) {
                response.success = true;
                response.contributer = res.contributer;
            }
            callback(null, response);
        });
    }
  };

  Contributors.remoteMethod('createContributor', {
      http: { path: '/createContributer', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });

  Contributors.deleteContributer = function(p_data, callback){
    let user = p_data.user;
    let game = p_data.game;
    let contributer = p_data.contributer;

    if (game.game_id == contributer.game_id && game.creator == user.user_id)
    {
        contributer.destroy();
    }
  };

  Contributors.remoteMethod('deleteContributor', {
      http: { path: '/deleteContributer', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });
};
