/**
 * Test-File for game management
 */

import { expect } from 'chai';
import request from 'request-promise';
import { env } from './env';

describe("Delete Game API-Method", function() {
    it("delete game success", async () => {
        env.post_options.form = env.game;
        let data = await doRequest(env.post_options, "/games/deleteGame");
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