'use strict';

export default function(Questions) {

    //Neue Frage anlegen
    Questions.createQuestion = function(p_data, callback){
        let user = p_data.user;
        let contributers = p_data.contributers;
        let questions = p_data.questions;

        if (user.user_id != contributers.user_id && user.user_id != game.creator)
            console.log("Not Authorized");
        else
        if ((contributers.create && (contributers.game_id == questions.game_id && questions.game_id == game.game_id)) || user.user_id == game.creator  && questions.game_id == game.game_id)
                Questions.create(questions, (err, res) => {
                    if(res) {
                        response.success = true;
                        response.questions = res.questions;
                    }
                    callback(null, response);
                });
                else
                    console.log("Not Authorized");
    };

    Questions.remoteMethod('createQuestion', {
        http: { path: '/createQuestion', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Frage bearbeiten
    Questions.updateQuestion = function(p_data, callback){
        let user = p_data.user;
        let contributers = p_data.contributers;
        let questions = p_data.questions;

        if (user.user_id != contributers.user_id && user.user_id != game.creator)
            console.log("Not Authorized");
        else
            if ((contributers.edit && (contributers.game_id == questions.game_id && questions.game_id == game.game_id)) || user.user_id == game.creator  && questions.game_id == game.game_id)
                Questions.upsert(questions, (err, res) => {
                    if(res) {
                        response.success = true;
                        response.questions = res.questions;
                    }
                    callback(null, response);
                });
                else
                    console.log("Not Authorized");
    };

    Questions.remoteMethod('updateQuestion', {
        http: { path: '/updateQuestion', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Frage löschen
    Questions.deleteQuestion = function(p_data, callback){
        let user = p_data.user;
        let contributers = p_data.contributers;
        let questions = p_data.questions;
        let game = p_data.game;


        if (user.user_id != contributers.user_id && user.user_id != game.creator)
            console.log("Not Authorized");
        else
        if ((contributers.delete && (contributers.game_id == questions.game_id && questions.game_id == game.game_id)) || user.user_id == game.creator  && questions.game_id == game.game_id)
                Questions.destroyById(questions.question_id, (err, res) => {
                    if(res) {
                        response.success = true;
                    }
                    callback(null, response);
                });
                else
                    console.log("Not Authorized");
    };

    Questions.remoteMethod('deleteQuestion', {
        http: { path: '/deleteQuestion', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });
};
