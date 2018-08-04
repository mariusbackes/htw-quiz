'use strict';

export default function(Multiplechoice) {
  // Mulitplce Choice Antworten zu einer Frage eintragen
  Multiplechoice.getMultipleChoiceOptions = function(p_question_id, callback){
    let response = {
      success: false
    };

    Multiplechoice.findById(p_question_id, (err, res) => {
      if(res) {
        response.success = true;
        response.multiple_choice = res;
      }
      callback(null, response);
    });
  };

  Multiplechoice.remoteMethod('insertMutlipleChoiceOptions', {
    http: { path: '/insertMutlipleChoiceOptions', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object' }
  });

  // Mulitplce Choice Antworten zu einer Frage eintragen
  Multiplechoice.insertMutlipleChoiceOptions = function(p_data, callback){
    let response = {
      success: false
    };

    Multiplechoice.create(p_data, (err, res) => {
      if(err){
        console.log(err);
      }

      if(res) {
        response.success = true;
        response.multiple_choice = res;
      }
      callback(null, response);
    });
  };

  Multiplechoice.remoteMethod('insertMutlipleChoiceOptions', {
      http: { path: '/insertMutlipleChoiceOptions', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });

  // Mulitplce Choice Antworten zu einer Frage updaten
  Multiplechoice.updateMutlipleChoiceOptions = function(p_data, callback){
    let response = {
      success: false
    };
    Multiplechoice.upsert(p_data, (err, res) => {
      if(res){
        response.success = true;
        response.multiple_choice = res;
        callback(null, response);
      } else {
        callback(null, response);
      }
    });
  };

  Multiplechoice.remoteMethod('updateMutlipleChoiceOptions', {
      http: { path: '/updateMutlipleChoiceOptions', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });

  // Mulitplce Choice Antworten zu einer Frage löschen
  Multiplechoice.deleteMutlipleChoiceOptions = function(p_question_id, callback){
    let success = false;
    Multiplechoice.destroyById(p_question_id, (err, res) => {
      if(res){
        success = res.count > 0;
      }
      callback(null, success);
    });
  };

  Multiplechoice.remoteMethod('deleteMutlipleChoiceOptions', {
      http: { path: '/deleteMutlipleChoiceOptions', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });
};
