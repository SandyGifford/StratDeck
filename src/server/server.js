console.clear();

const express = require("express");
const app = express();
const server = require("http").Server(app);

const socketStuff = require("./socketStuff");
const routing = require("./routing");

socketStuff(server);
app.use(routing);

server.listen(3000, "0.0.0.0");
