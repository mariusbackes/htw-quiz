/**
 * Test-File for game management
 */

import { expect } from 'chai';
import request from 'request-promise';
import { env } from './env';

describe("Game API-Methods", function() {
    it("create game success", async () => {
        env.game.creator = env.user.user_id;
        let post_data = {
            game: env.game,
            user: env.user
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/games/createGame");
        env.game.game_id = data.response.game_id;
        expect(data.response.success).to.equal(true);
    });

    it("edit game success", async () => {
        let game = env.game;
        game.name = "Ein neuer Titel für ein bearbeitetes Spiel";
        game.description = "Hier ist eine bearbeitete Beschreibung für ein Spiel";
        let post_data = {
            game: game
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/games/editGame");
        expect(data.response.success).to.equal(true);
    });

    it("get games success", async () => {
        let post_data = {
            user_id: env.user.user_id
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/games/getGames");
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