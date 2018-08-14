/*
 * Service for game user http-requests
 */

import axios from 'axios';
import { environment } from "../environment/environment";

export default {
    addOrUpdateUserAsContributor(contributorOptions){
        let data = {
            contributorOptions: contributorOptions
        };
        let api_endpoint = 'contributors/addOrUpdateUserAsContributor';
        return axios.post(environment.api_url + api_endpoint, data).then((response) => {
          return response.data.response;
        })
    },
    deleteUserAsContributor(user_id, game_id){
        let data = {
            user_id: user_id,
            game_id: game_id
        };
        let api_endpoint = 'contributors/deleteUserAsContributor';
        return axios.post(environment.api_url + api_endpoint, data).then((response) => {
          return response.data.response;
        })
    }
};
