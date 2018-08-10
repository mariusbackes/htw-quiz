/**
 * Test-File for highscore management
 */

import { expect } from 'chai';
import request from 'request-promise';
import { env } from './env';

describe("Highscore API-Methods", function() {
    it("save highscore success", async () => {
        let post_data = {
            game_id: env.game.game_id,
            user_id: env.user.user_id,
            game_summary: env.game_summary
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/highscores/saveHighscore");
        expect(data.response.success).to.equal(true);
    });

    it("get own highscores for all games success", async () => {
        let post_data = {
            user_id: env.user.user_id
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/highscores/getOwnHighscoresForAllGames");
        expect(data.response.success).to.equal(true);
    });

    it("get own highscores for specific game success", async () => {
        let post_data = {
            user_id: env.user.user_id,
            game_id: env.game.game_id
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/highscores/getOwnHighscoresForSpecificGame");
        expect(data.response.success).to.equal(true);
    });

    it("get all highscores for specific game success", async () => {
        let post_data = {
            game_id: env.game.game_id
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/highscores/getAllHighscoresForSpecificGame");
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