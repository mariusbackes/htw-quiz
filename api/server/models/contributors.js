'use strict';

export default function(Contributors) {
  let User;

  // TimeFrame Methoden aktivieren
  Contributors.on('attached', (app) => {
    User = app.models.user;
  });

  Contributors.loadContributorsForGame = function(p_data, callback){
    let response = {
      success: false
    };
    let r_contributors_arr = [];

    Contributors.find({where: {game_id: p_data.game_id}}, (err, res) => {
      if(res){
        if(res.length > 0){
          res.forEach((c, index) => {
            let r_contributors_obj = {};
            r_contributors_obj.game_id = c.game_id;
            r_contributors_obj.user_id = c.user_id;
            r_contributors_obj.play_value = c.play_value;
            r_contributors_obj.edit_value = c.edit_value;
            r_contributors_obj.delete_value = c.delete_value;
            User.getById(c.user_id).then((res_user) => {
              r_contributors_obj.user = res_user;
              r_contributors_arr.push(r_contributors_obj);
              if(index === res.length - 1){
                response.success = true;
                response.contributors = r_contributors_arr;
                callback(null, response);
              }
            });
          })
        } else {
          response.success = true;
          response.contributors = r_contributors_arr;
          callback(null, response);
        }
      } else {
        callback(null, response);
      }
    })
  };

  Contributors.remoteMethod('loadContributorsForGame', {
    http: { path: '/loadContributorsForGame', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  Contributors.addOrUpdateUserAsContributor = function(p_data, callback){
    let response = {
      success: false
    };

    Contributors.upsert(p_data.contributorOptions, (err, res) => {
      if(res) {
          response.success = true;
          response.contributor = res;
      }
      callback(null, response);
    });
  };

  Contributors.remoteMethod('addOrUpdateUserAsContributor', {
      http: { path: '/addOrUpdateUserAsContributor', verb: 'post' },
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

  Contributors.getContributionsForUser = function(p_user_id, callback){
    let response = {
      success: false
    };
    let filter = { where: {user_id: p_user_id }};

    Contributors.find(filter, (err, res) => {
      if(res && res.length > 0){
        response.success = true;
        response.contributing_games = res;
        callback(null, response);
      } else {
        callback(null, response);
      }
    })
  }
};
