'use strict';

export default function(Questions) {
    let Multiplechoice;

    // TimeFrame Methoden aktivieren
    Questions.on('attached', (app) => {
        Multiplechoice = app.models.multiple_choice;
    });

    Questions.getQuestions = function(p_data, callback){
        let response = {
            success: false
        };

        // TODO: Implement

        callback(null, response);
    };

    Questions.remoteMethod('getQuestions', {
        http: { path: '/getQuestions', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Neue Frage anlegen
    Questions.saveQuestion = function(p_data, callback){
      let response = {
        success: false
      };
      let user = p_data.user;
      // let contributers = p_data.contributers;
      let question = p_data.question;
      let multiple_choice = p_data.question.multiple_choice;
      delete question.multiple_choice;

      //if (user.user_id != contributers.user_id && user.user_id != game.creator) {
      //  console.log("Not Authorized");
      //  callback(null, response);
      //} else {
      //  if (
      //      (contributers.create && (contributers.game_id == question.game_id && question.game_id == game.game_id))
      //      || user.user_id == game.creator  && question.game_id == game.game_id){
                Questions.create(question, (err, res) => {
                  if(err) {
                    console.log(err);
                  }
                  if(res) {
                    // Save multiple choice values, if available
                    if(question.is_multiple_choice){
                        // TODO: Implement
                    }
                    response.success = true;
                    response.question = res;
                    callback(null, response);
                  }
                });
        //    }
        //else {
        //    console.log("Not Authorized");
        //    callback(null, response);
        //}
      //}
    };

    Questions.remoteMethod('saveQuestion', {
        http: { path: '/saveQuestion', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    //Frage bearbeiten
    Questions.updateQuestion = function(p_data, callback){
      let response = {
        success: false
      };
      let user = p_data.user;
      let contributers = p_data.contributers;
      let question = p_data.question;

      if (user.user_id != contributers.user_id && user.user_id != game.creator)
          console.log("Not Authorized");
      else
          if ((contributers.edit && (contributers.game_id == question.game_id && question.game_id == game.game_id)) || user.user_id == game.creator  && questions.game_id == game.game_id)
              Questions.upsert(question, (err, res) => {
                  if(res) {
                      // TODO: Check if multiple choice has changed
                      response.success = true;
                      response.question = res.question;
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
      let response = {
        success: false
      };
      let user = p_data.user;
      let contributers = p_data.contributers;
      let question = p_data.question;
      let game = p_data.game;

      if (user.user_id != contributers.user_id && user.user_id != game.creator)
          console.log("Not Authorized");
      else
      if ((contributers.delete && (contributers.game_id == question.game_id && question.game_id == game.game_id)) || user.user_id == game.creator  && questions.game_id == game.game_id)
              Questions.destroyById(question.question_id, (err, res) => {
                  if(res) {
                      // Also delete the multiple choice values
                      if(question.is_multiple_choice){
                        // TODO: delete multiplce choice values for this question
                        response.success = true;
                      }
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
