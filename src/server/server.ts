console.clear();

import express from "express";
import { Server } from "http";

import SocketStuff from "./socketStuff";
import routing from "./routing";

const app = express();
const server: Server = require("http").Server(app);

SocketStuff(server);
app.use(routing);

server.listen(3000, "0.0.0.0");
