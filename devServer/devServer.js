console.clear();

const express = require("express");
const path = require("path");
const app = express();

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../dist", req.url)));

app.listen(8080);
