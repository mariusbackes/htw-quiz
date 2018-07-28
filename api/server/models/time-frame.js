'use strict';
export default function(Timeframe) {
    //Timeframe anlegen
    Timeframe.createTimeframe = function(p_data, callback){ //pdata: user; timeframe; game
        let response = {
            success: false
        };
        let timeframe = p_data.timeframe;
        let user = p_data.user;
        let game = p_data.game;

        if (user.user_id != game.creator)
        {
            console.log("Not Authorized");
        }
        else
        Timeframe.create(p_data.timeframe, (err, res) => {
            if(res) {
                response.success = true;
                response.timeframe = res.timeframe;
            }
            callback(null, response);
        });
    };

    Timeframe.remoteMethod('createTimeframe', {
        http: { path: '/createTimeframe', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Timeframe löschen
    Timeframe.deleteTimeframe = function (p_data, callback){
        let response = {
            success: false
        };
        let where =
            {
                where: {and: [game_id = p_data.timeframe.game_id, from = p_data.timeframe.from, to = p_data.timeframe.to]}
            }
        let timeframe = p_data.timeframe;
        let user = p_data.user;
        let game = p_data.game;

        if (user.user_id != game.creator)
        {
            console.log("Not Authorized");
        }
        else
        Timeframe.destroyAll(where, (err, res) => {
            if(res) {
                response.success = true;
            }
            callback(null, response);
        });
    };

    Timeframe.remoteMethod('deleteTimeframe', {
        http: { path: '/deleteTimeframe', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Timeframe ändern
    Timeframe.updateTimeframe = function(p_data, callback){
      let response = {
        success: false
      };
      let timeframe = p_data.timeframe;
      let user = p_data.user;
      let game = p_data.game;

      if (user.user_id != game.creator)
      {
          console.log("Not Authorized");
      }
      else
      Timeframe.upsert(timeframe, (err, res) => {
          if(res) {
              response.success = true;
              response.timeframe = res.timeframe;
          }
          callback(null, response);
      });
    };

    Timeframe.remoteMethod('updateTimeframe', {
        http: { path: '/updateTimeframe', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });



};
