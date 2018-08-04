/*
 * Service for all question http-requests
 */

import axios from 'axios';
import { environment } from "../environment/environment";

export default {
  getQuestionsForGame(game_id){
    let data = {
      game_id: game_id
    };
    let api_endpoint = 'questions/getQuestions';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
  saveQuestion(question) {
    let data = {
      question: question
    };
    let api_endpoint = 'questions/saveQuestion';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
  editQuestion(question){
    let data = {
      question: question
    };
    let api_endpoint = 'questions/editQuestion';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
  deleteQuestion() {
    // TODO: Implement
  }
};
