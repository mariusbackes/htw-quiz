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
  "user_id": null,
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
    it("register success", async () => {
      post_options.form = user;
      let data = await doRequest(post_options, "/users/registerUser");
      user.user_id = data.response.user_id;
      expect(data.response.success).to.equal(true);
    });

    it("login success", async () => {
      post_options.form = user;
      let data = await doRequest(post_options, "/users/login");
      expect(data.response.success).to.equal(true);
    });

    it("login failes", async () => {
      user.password = "falsches_passwort";
      post_options.form = user;
      let data = await doRequest(post_options, "/users/login");
      expect(data.response.success).to.equal(false);
    });

    it("update user email-success", async () => {
      let post_data = {
        user: user,
        new_email: "mariusbackes1@web.de"
      }
      post_options.form = post_data;
      let data = await doRequest(post_options, "/users/changeEmail");
      expect(data.response.success).to.equal(true);
    });

    it("update username success", async () => {
      let post_data = {
        user: user,
        new_username: "marius_new_username"
      }
      post_options.form = post_data;
      let data = await doRequest(post_options, "/users/changeUsername");
      expect(data.response.success).to.equal(true);
    });

    it("update user password success", async () => {
      let post_data = {
        user: user,
        old_password: "test_passwort",
        new_password: "test_passwort"
      }
      post_options.form = post_data;
      let data = await doRequest(post_options, "/users/changePassword");
      expect(data.response.success).to.equal(true);
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