'use strict';

export default function(Multiplechoice) {
  // Mulitplce Choice Antworten zu einer Frage eintragen
  Multiplechoice.insertMutlipleChoiceOptions = function(p_data, callback){
    let response = {
      success: false
    };
    // TODO: Implement
    callback(null, response);
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
    // TODO: Implement
    callback(null, response);
  };

  Multiplechoice.remoteMethod('updateMutlipleChoiceOptions', {
      http: { path: '/updateMutlipleChoiceOptions', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });

  // Mulitplce Choice Antworten zu einer Frage löschen
  Multiplechoice.deleteMutlipleChoiceOptions = function(p_data, callback){
    let response = {
      success: false
    };
    // TODO: Implement
    callback(null, response);
  };

  Multiplechoice.remoteMethod('deleteMutlipleChoiceOptions', {
      http: { path: '/deleteMutlipleChoiceOptions', verb: 'post' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'response', type: 'object' }
  });
};
