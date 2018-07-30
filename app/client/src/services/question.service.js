/*
 * Service for all question http-requests
 */

import axios from 'axios';
import { environment } from "../environment/environment";

export default {
  getQuestions(){
    // TODO: Implement
  },
  addQuestion(question, user_id) {
    let data = {
      game: game,
      user: user
    };
    let api_endpoint = 'games/createGame';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
  editQuestion(){
    // TODO: Implement
  },
  deleteQuestion() {
    // TODO: Implement
  }
};
