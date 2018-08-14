/*
 * Service for game user http-requests
 */

import axios from 'axios';
import { environment } from "../environment/environment";

export default {
  createGame(game, user) {
    let data = {
      game: game,
      user: user
    };
    let api_endpoint = 'games/createGame';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
  editGame(game){
    let data = {
      game: game
    };
    let api_endpoint = 'games/editGame';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
  getOwnGames(user_id){
    let data = {
      user_id: user_id
    };
    let api_endpoint = 'games/getOwnGames';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
  getAllGamesForStartpage(user_id){
    let data = {
      user_id: user_id
    };
    let api_endpoint = 'games/getAllGamesForStartpage';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  },
  deleteGame(game){
    let api_endpoint = 'games/deleteGame';
    return axios.post(environment.api_url + api_endpoint, game).then((response) => {
      return response.data.response;
    })
  }
};
