const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../../dist/index.html")));
app.get("/assets/*", (req, res) => res.sendFile(path.join(__dirname, "../../dist", req.url)));
app.get("/build/*", (req, res) => res.sendFile(path.join(__dirname, "../../dist", req.url)));

module.exports = app;
