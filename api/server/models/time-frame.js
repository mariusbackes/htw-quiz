'use strict';

export default function(Timeframe) {

    //Timeframe anlegen
    Timeframe.createTimeframe = function(p_timeframe, callback){
        let response = {
            success: false
        };
        Timeframe.create(p_timeframe, (err, res) => {
            if(res) {
                response.success = true;
                response.timeframe = res.timeframe;
            }
            callback(null, response);
        });
    }

    Timeframe.remoteMethod('createTimeframe', {
        http: { path: '/createTimeframe', verb: 'post' },
        accepts: { arg: 'timeframe', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Timeframe löschen
    Timeframe.deleteTimeframe = function (p_timeframe, callback){
        let response = {
            success: false
        };
        let where = 
            {
                where: {and: [game_id = p_timeframe.game_id, from = p_timeframe.from, to = p_timeframe.to]}
            }
        Timeframe.destroyAll(where, (err, res) => {
            if(res) {
                response.success = true;
            }
            callback(null, response);
        });
    }

    Timeframe.remoteMethod('deleteTimeframe', {
        http: { path: '/deleteTimeframe', verb: 'post' },
        accepts: { arg: 'timeframe', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Timeframe ändern
    Timeframe.updateTimeframe = function(p_data, callback){
        let timeframe = p_data.timeframe;
        timeframe.from = p_data.from;
        timeframe.to = p_data.to;
        Timeframe.upsert(timeframe, (err, res) => {
            if(res) {
                response.success = true;
                response.timeframe = res.timeframe;
            }
            callback(null, response);
        });
    }

    Timeframe.remoteMethod('updateTimeframe', {
        http: { path: '/updateTimeframe', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });



};
