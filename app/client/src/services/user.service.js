/*
 * Service for all user http-requests
 */

import axios from 'axios';
import { environment } from "../environment/environment";

export default {
  register() {
    // TODO: Implement
  },

  login(user){
    let api_endpoint = 'users/login';
    return axios.post(environment.api_url + api_endpoint, user).then((response) => {
      return response.data.response;
    });
  },

  changePassword(){
    // TODO: Implement
  },

  changeEmail() {
    // TODO: Implement
  },

  changeUsername() {
    // TODO: Implement
  },

  deleteUser() {
    // TODO: Implement
  }
};
