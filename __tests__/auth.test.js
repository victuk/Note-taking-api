const request = require("supertest");
const app = require("../app");
const user = require("../models/register");
const mongoose = require("mongoose");

beforeAll(async () => {
    await user.findOneAndDelete({email: "sample@sample.com"});
});

afterAll(async() => {
    await mongoose.disconnect();
});


describe("Tests the authentication", () => {
    test("Register", async () => {
        const response = await request(app).post("/v1/register").send({
            email: "sample@sample.com",
            fullName: "Sample User",
            password: "sampleuser"
        }).set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
    });

    test("Login", async () => {
        const response = await request(app).post("/v1/login").send({
            email: "sample@sample.com",
            password: "sampleuser"
        }).set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
    });
    
});