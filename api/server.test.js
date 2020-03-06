const request = require("supertest");
const server = require("./server.js");

//server
describe("server", () => {
    //1
    test("runs the tests", () => {
    expect(true).toBe(true);
    });

    //2
    test("should use testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
    })
});

//register
describe("POST to /register", () => {
    test("should return status 201 CREATED", () => {
        return request(server)
            .post("/auth/register")
            .send({ username:"testname", phonenumber: "1111111", password:"testpw4" })
            .then(res => {
                expect(res.status).toBe(201);
        });
    });

    test("should return JSON formatted body", () => {
        return request(server)
            .post("/auth/login")
            .then(res => {
                expect(res.type).toMatch(/json/);
        });
    });
});

//login
describe("POST to /login", () => {
    test("should return status 200 OK", () => {
        return request(server)
            .post("/auth/login")
            .send({ username:"testname4", password:"testpw4" })
            .then(res => {
                expect(res.status).toBe(200);
        });
    });

    test("should return JSON formatted body", () => {
        return request(server)
            .post("/auth/login")
            .then(res => {
                expect(res.type).toMatch(/json/);
        });
    });
});