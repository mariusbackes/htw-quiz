'use strict';

export default function(Contributors) {
  Contributors.addOrUpdateUserAsContributor = function(p_data, callback){
    let response = {
      success: false
    };

    Contributers.upsert(p_data.contributorOptions, (err, res) => {
      if(res) {
          response.success = true;
          response.contributor = res;
      }
      callback(null, response);
    });
  };

  Contributors.remoteMethod('addOrUpdateUserAsContributor', {
      http: { path: '/addOrUpdateUserAsContributors', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });

  Contributors.deleteUserAsContributor = function(p_data, callback){
    let response = {
      success: false
    };

    let where = { where: 
      { and: [
        {user_id: p_data.user_id}, 
        {game_id: p_data.game_id}
        ]
      }
    };

    Contributors.destroyAll(where, (err, res) => {
      if(res){
        response.success = true;
        callback(null, response);
      }
    });
  };

  Contributors.remoteMethod('deleteUserAsContributor', {
      http: { path: '/deleteUserAsContributor', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });
};
