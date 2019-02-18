console.clear();

import * as path from "path";
console.log("=> " + path.join(__dirname, "../index.html"));

import * as express from "express";
import { Server } from "http";

const app = express();
const server: Server = require("http").Server(app);

import SocketStuff from "./socketStuff";
import routing from "./routing";

SocketStuff(server);
app.use(routing);

server.listen(3000, "0.0.0.0");
