/**
 * Test-File for user management
 */

import { expect } from 'chai';
import request from 'request-promise';

const url = 'http://localhost:3000/api';

const post_options = {
  method: 'POST'
};

const get_options = {
  method: 'GET'
};

const user = {
  "username": "mariusb73", 
  "email": "mariusbackes@icloud.com", 
  "first_name": "Marius", "last_name": 
  "Backes", "password": "test_passwort", 
  "registered_at": new Date().toDateString(),
  "last_login": new Date().toDateString(),
  "completed_games": 0,
  "reached_points": 0,
  "admin": 0
}

describe("User API-Methods", () => {
    it("login success", async () => {
      post_options.form = user;
      let data = await doRequest(post_options, "/users/login");
      expect(data.response.success).to.equal(true);
      //expect(data.response.user).not.empty;
    });

    it("login failes", async () => {
      user.password = "falsches_passwort";
      post_options.form = user;
      let data = await doRequest(post_options, "/users/login");
      expect(data.response.success).to.equal(false);
      //expect(data.response.user).not.empty;
    });
});

const doRequest = async (options, query) => {
  options.uri = url + query;
  options.json = true;

  return request(options)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
};