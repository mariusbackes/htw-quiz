/**
 * Test-File for user management
 */

import { expect } from 'chai';
import request from 'request-promise';

const url = 'http://localhost:8080';
const options = {
  method: 'POST'
};

describe("User API-Methods", () => {
    it("register", async () => {
        options.form = {

        };
        let data = await doRequest(options, "/user/register");
        expect(data.success).to.equal(true);
        expect(data.userdata).not.empty;
    });

    it("login", async () => {

    });

    it("change_password", async () => {

    });

    it("change_email", async () => {

    });

    it("change_name", async () => {

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