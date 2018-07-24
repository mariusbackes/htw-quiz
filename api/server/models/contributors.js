'use strict';

export default function(Contributors) {

    Contributers.createContributer = function(p_data, callback){
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
    }

    Questions.remoteMethod('createContributer', {
        http: { path: '/createContributer', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    Contributers.deleteContributer = function(p_data, callback){
        let user = p_data.user;
        let game = p_data.game;
        let contributer = p_data.contributer;

        if (game.game_id == contributer.game_id && game.creator == user.user_id)
        {
            contributer.destroy();
        }
    }

    Questions.remoteMethod('deleteContributer', {
        http: { path: '/deleteContributer', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

};
