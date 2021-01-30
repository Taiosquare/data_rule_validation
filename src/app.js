require("dotenv").config();

const express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    router = require("./api/router"),
    error = require("./api/error");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use(error.get404);

module.exports = { app };