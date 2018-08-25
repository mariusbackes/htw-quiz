/**
 * Test-File for question management
 */

import { expect } from 'chai';
import request from 'request-promise';
import { env } from './env';

describe("Question API-Methods", function() {
    it("create question success", async () => {
        env.question.game_id = env.game.game_id;
        let post_data = {
            question: env.question
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/questions/saveQuestion");
        env.question.question_id = data.response.question.question_id;
        expect(data.response.success).to.equal(true);
    });

    it("edit question success", async () => {
        env.question.text = "Das ist ein neuer Testfragetext!";
        env.question.correct_answer = "Und auch eine neue richtige Antwort :-)";
        let post_data = {
            question: env.question
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/questions/editQuestion");
        expect(data.response.success).to.equal(true);
    });

    it("get questions for game success", async () => {
        let post_data = {
            game_id: env.game.game_id
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/questions/getQuestions");
        expect(data.response.success).to.equal(true);
    });

    it("delete question success", async () => {
        let post_data = {
            question: env.question
        };
        env.post_options.form = post_data;
        let data = await doRequest(env.post_options, "/questions/deleteQuestion");
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
