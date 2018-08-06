/**
 * Test-File for user management
 */

import { expect } from 'chai';
import request from 'request-promise';
import { env } from './env';

describe("User API-Methods", () => {
  it("register success", async () => {
    env.post_options.form = env.user;
    let data = await doRequest(env.post_options, "/users/registerUser");
    env.user.user_id = data.response.user_id;
    expect(data.response.success).to.equal(true);
  });

  it("login success", async () => {
    env.post_options.form = env.user;
    let data = await doRequest(env.post_options, "/users/login");
    expect(data.response.success).to.equal(true);
  });

  it("login failes", async () => {
    env.user.password = "falsches_passwort";
    env.post_options.form = env.user;
    let data = await doRequest(env.post_options, "/users/login");
    expect(data.response.success).to.equal(false);
  });

  it("update user email-success", async () => {
    env.user.password = "test_passwort";
    let post_data = {
      user: env.user,
      new_email: "mariusbackes1@web.de"
    }
    env.post_options.form = post_data;
    let data = await doRequest(env.post_options, "/users/changeEmail");
    expect(data.response.success).to.equal(true);
    env.user.email = "mariusbackes1@web.de";
  });

  it("update username success", async () => {
    let post_data = {
      user: env.user,
      new_username: "marius_new_username"
    }
    env.post_options.form = post_data;
    let data = await doRequest(env.post_options, "/users/changeUsername");
    expect(data.response.success).to.equal(true);
    env.user.username = "marius_new_username";
  });

  it("update user password success", async () => {
    let post_data = {
      user: env.user,
      old_password: "test_passwort",
      new_password: "test_passwort"
    }
    env.post_options.form = post_data;
    let data = await doRequest(env.post_options, "/users/changePassword");
    expect(data.response.success).to.equal(true);
  });
})

const doRequest = async (options, query) => {
  options.uri = env.url + query;
  options.json = true;

  return request(options)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
};