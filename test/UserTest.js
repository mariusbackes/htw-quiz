/**
 * Test-File for user management
 */

import { expect } from 'chai';
import request from 'request-promise';

const url = 'http://localhost:8001';
const options = {
  method: 'POST'
};

describe("User API-Methods", () => {
    it("register success", async () => {
        options.form = {
          username: "mariusb73",
          email: "mariusbackes@icloud.com",
          first_name: "Marius",
          last_name: "Backes",
          password: "test123"
        };
        let data = await doRequest(options, "/user/register");
        expect(data.success).to.equal(true);
        expect(data.userdata).not.empty;
    });

    it("login success", async () => {
      options.form = {
        username: "mariusb73",
        email: "mariusbackes@icloud.com",
        password: "test123"
      };
      let data = await doRequest(options, "/user/login");
      expect(data.success).to.equal(true);
      expect(data.userdata).not.empty;
    });

    it("change_password success", async () => {
      options.form = {
        user_id: "1",
        username: "mariusb73",
        email: "mariusbackes@icloud.com",
        password: "test123"
      };
      let data = await doRequest(options, "/user/change_password");
      expect(data.success).to.equal(true);
    });

    it("change_email success", async () => {
      options.form = {
        user_id: "1",
        username: "mariusb73",
        email: "mariusbackes@icloud.com",
        password: "test123"
      };
      let data = await doRequest(options, "/user/change_email");
      expect(data.success).to.equal(true);
    });

    it("change_name success", async () => {
      options.form = {
        user_id: "1",
        username: "mariusb73",
        email: "mariusbackes@icloud.com",
        password: "test123",
        first_name: "Marius",
        last_name: "Backes"
      };
      let data = await doRequest(options, "/user/change_name");
      expect(data.success).to.equal(true);
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