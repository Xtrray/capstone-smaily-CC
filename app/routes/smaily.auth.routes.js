const express = require("express");
const controller = require("../controllers/smaily.controller");
const app = express();
const { verifySignUp, authJwt } = require("../auth")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/auth/register",
        [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        controller.registerParent
    );
    app.post(
        "/auth/register/:id/children",
        [authJwt.verifyToken, authJwt.isParent],
        controller.registerChildren
    );
    app.post(
        "/auth/login/children/:token",
        [
            authJwt.verifyConnectToken
        ],
        controller.logInChildren
    );
    app.post("/auth/login", controller.logIn);
    app.post("/auth/refreshtoken", controller.refreshToken);
};