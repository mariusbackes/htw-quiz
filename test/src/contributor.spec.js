/**
 * Test-File for game management
 */

import { expect } from 'chai';
import request from 'request-promise';
import { env } from './env';

describe("Contributor API-Methods", function() {
  it("search for user to contribute success", async () => {
    env.post_options.form = {
      email: env.contributing_user.email
    };
    let data = await doRequest(env.post_options, "/users/searchForUser");
    expect(data.response.success).to.equal(true);
  });

  it("add / update user as contributor success", async () => {
    env.contributor_options.game_id = env.game.game_id;
    env.contributor_options.user_id = env.contributing_user.user_id;
    env.post_options.form = {
      contributorOptions: env.contributor_options
    };
    let data = await doRequest(env.post_options, "/contributors/addOrUpdateUserAsContributor");
    expect(data.response.success).to.equal(true);
  });

  it("load contributors success", async () => {
    env.post_options.form = {
      game_id: env.game.game_id
    };
    let data = await doRequest(env.post_options, "/contributors/loadContributorsForGame");
    expect(data.response.success).to.equal(true);
  });

  it("delete user as contributor success", async () => {
    env.post_options.form = {
      game_id: env.game.game_id,
      user_id: env.contributing_user.user_id
    };
    let data = await doRequest(env.post_options, "/contributors/deleteUserAsContributor");
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
