/*
 * Service for all highscore http-requests
 */

import axios from 'axios';
import { environment } from "../environment/environment";

export default {
  saveHighscore(game_id, user_id, game_summary){
    let data = {
      game_id: game_id,
      user_id: user_id,
      game_summary: game_summary
    };
    let api_endpoint = 'highscores/saveHighscore';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
};
