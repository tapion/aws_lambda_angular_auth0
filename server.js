const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Create a new Express app
const app = express();

// Set up Auth0 configuration
const authConfig = {
    domain: "dev-kkmbcc3h.auth0.com",
    audience: "https://36iu0bmppi.execute-api.us-east-1.amazonaws.com/Dev/"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-kkmbcc3h.auth0.com
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
    res.send({
        msg: "Your Access Token was successfully validated!"
    });
});

// Start the app
app.listen(3001, () => console.log('API listening on 3001'));