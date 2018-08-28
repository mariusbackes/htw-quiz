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

    Questions.find({where: {game_id:p_data.game_id}}, (err, res_questions) => {
      if(res_questions){
        if(res_questions.length > 0){
          // Checking index, to check if loop is completed
          res_questions.forEach((question, index) => {
            // Load time frames for challenged games
            if(question.is_multiple_choice){
              // Multiplechoice.getMultipleChoiceOptions(question.question_id, (err, result) => {
              //   question.multiple_choice = {
              //     wrong_answer_1: result.multiple_choice.wrong_answer_1,
              //     wrong_answer_2: result.multiple_choice.wrong_answer_2,
              //     wrong_answer_3: result.multiple_choice.wrong_answer_3
              //   };
              var mc = Multiplechoice.getMultipleChoiceOptions(question.question_id);
              mc.then(function(mc_answers){
                question.multiple_choice = {
                       wrong_answer_1: mc_answers.multiple_choice.wrong_answer_1,
                       wrong_answer_2: mc_answers.multiple_choice.wrong_answer_2,
                       wrong_answer_3: mc_answers.multiple_choice.wrong_answer_3
                    };              
                if(index === res_questions.length - 1){
                  response.success = true;
                  response.questions = res_questions;
                  callback(null, response);                  
                }  
              });            
            } else {
              
              if(index === res_questions.length - 1){
                
                 setTimeout(function(){// Bugfix: wenn die letzte frage kein mc ist, dann werden falsche werte gesendet 
                 response.success = true;
                 response.questions = res_questions;
                 callback(null, response);
                 }, 2000)
                
              }
            }
          });
        } else {
          response.questions = res_questions;
          callback(null, response);
        }
      }
    });
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
                if(res) {
                  response.success = true;
                  response.question = res;
                  // Save multiple choice values, if available
                  if(question.is_multiple_choice) {
                    multiple_choice.question_id = res.question_id;
                    Multiplechoice.insertMutlipleChoiceOptions(multiple_choice, (err, res) => {
                      if(res){
                        response.question.multiple_choice = res.multiple_choice;
                        callback(null, response);
                      } else {
                        response.success = false;
                        callback(null, response);
                      }
                    })
                  } else {
                    callback(null, response);
                  }
                } else {
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
  Questions.editQuestion = function(p_data, callback){
    let response = {
      success: false
    };
    //let user = p_data.user;
    //let contributers = p_data.contributers;
    let question = p_data.question;

    //if (user.user_id != contributers.user_id && user.user_id != game.creator)
    //    console.log("Not Authorized");
    //else
    //    if ((contributers.edit && (contributers.game_id == question.game_id && question.game_id == game.game_id)) || user.user_id == game.creator  && questions.game_id == game.game_id)
            Questions.upsert(question, (err, res) => {
                if(res) {
                  response.question = res;
                    if(question.is_multiple_choice){
                      question.multiple_choice.question_id = question.question_id;
                      Multiplechoice.updateMutlipleChoiceOptions(question.multiple_choice, (err, res) => {
                        if(res.success){
                          response.success = true;
                          response.question.multiple_choice = res.multiple_choice;
                        }
                        callback(null, response);
                      })
                    } else {
                      response.success = true;
                      callback(null, response);
                    }
                } else {
                  callback(null, response);
                }
            });
    //        else
    //            console.log("Not Authorized");
  };

  Questions.remoteMethod('editQuestion', {
      http: { path: '/editQuestion', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });

  // Frage löschen
  Questions.deleteQuestion = function(p_data, callback){
    let response = {
      success: false
    };
    //let user = p_data.user;
    //let contributers = p_data.contributers;
    let question = p_data.question;
    //let game = p_data.game;

    //if (user.user_id != contributers.user_id && user.user_id != game.creator)
    //    console.log("Not Authorized");
    //else
    //if ((contributers.delete && (contributers.game_id == question.game_id && question.game_id == game.game_id)) || user.user_id == game.creator  && questions.game_id == game.game_id)
      // Check for multiple choice and delete it first, because of the foreign key constraint
      if(question.is_multiple_choice) {
        Multiplechoice.deleteMutlipleChoiceOptions(question.question_id, (err, res) => {
          if(res){
            Questions.deleteQuestionFromDatabase(question, (err, res) => {
              if(res){
                response.success = true;
              }
              callback(null, response);
            })
          } else {
            callback(null, response);
          }
        })
      } else {
        Questions.deleteQuestionFromDatabase(question, (err, res) => {
          if(res){
            response.success = true;
          }
          callback(null, response);
        })
      }

    // else
    //     console.log("Not Authorized");
  };

  Questions.remoteMethod('deleteQuestion', {
      http: { path: '/deleteQuestion', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });

  /* -------------------------------------------- Interne Methoden -------------------------------------------- */

  Questions.deleteQuestionFromDatabase = function (question, callback) {
    let success = false;
    Questions.destroyById(question.question_id, (err, res) => {
      if(res) {
        success = res.count > 0;
      }
      callback(null, success);
    });
  }
};

