/*
 * Service for all user http-requests
 */

import axios from 'axios';
import { environment } from "../environment/environment";

export default {
  register(user) {
    let api_endpoint = 'users/registerUser';
    return axios.post(environment.api_url + api_endpoint, user).then((response) => {
      return response.data.response;
    })
  },

  login(user){
    let api_endpoint = 'users/login';
    return axios.post(environment.api_url + api_endpoint, user).then((response) => {
      return response.data.response;
    });
  },

  changePassword(user, old_password, new_password){
    let data = {
      user: {
        user_id: user.user_id
      },
      old_password: old_password,
      new_password: new_password
    };
    let api_endpoint = 'users/changePassword';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    });
  },

  changeEmail(user, new_email) {
    let data = {
      user: {
        user_id: user.user_id,
        password: user.password
      },
      new_email: new_email
    };
    let api_endpoint = 'users/changeEmail';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    });
  },

  changeUsername(user, new_username) {
    let data = {
      user: {
        user_id: user.user_id,
        password: user.password
      },
      new_username: new_username
    };
    let api_endpoint = 'users/changeUsername';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    });
  },

  deleteUser(user, password) {
    let data = {
      user_id: user.user_id,
      password: password
    };
    let api_endpoint = 'users/deleteUser';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    });
  },
  searchForUser(email) {
    let data = {
        email: email
    };
    let api_endpoint = 'users/searchForUser';
    return axios.post(environment.api_url + api_endpoint, data).then((response) => {
      return response.data.response;
    })
  }
};
