/**
 * Test-File for user management
 */

import { expect } from 'chai';
import request from 'request-promise';
import { env } from './env';

describe("Delete user API-Method", () => {
  it("delete user success", async () => {
    env.post_options.form = env.user;
    let data = await doRequest(env.post_options, "/users/deleteUser");
    expect(data.response.success).to.equal(true);
  });

  it("delete contributing user success", async () => {
    env.post_options.form = env.contributing_user;
    let data = await doRequest(env.post_options, "/users/deleteUser");
    expect(data.response.success).to.equal(true);
  });
});

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
