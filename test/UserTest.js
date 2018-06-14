/**
 * Test-File for user management
 */

const expect  = require("chai").expect;
const request = require("request");

describe("User API-Methods", () => {
    describe("register", () => {
        it("returns status 200", () => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200); done();
            });
        });

        it("returns registered user", () => {});
    });

    describe("login", () => {
        it("returns status 200", () => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200); done();
            });
        });

        it("returns user login data", () => {});
    });

    describe("change_password", () => {
        it("returns status 200", () => {
            request(url, (error, response, body) => { 
                expect(response.statusCode).to.equal(200); done();
            });
        });

        it("returns boolean value if successful", () => {});
    });

    describe("change_email", () => {
        it("returns status 200", () => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200); done();
            });
        });

        it("returns boolean value if successful", () => {});
    });

    describe("change_name", () => {
        it("returns status 200", () => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200); done();
            });
        });

        it("returns boolean value if successful", () => {});
    });
});