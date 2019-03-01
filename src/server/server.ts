console.clear();

import express from "express";
import { Server } from "http";

import SocketStuff from "./socketStuff";
import routing from "./routing";

const app = express();
const server: Server = require("http").Server(app);

const port = parseInt(process.env.PORT) || 3000;

SocketStuff(server);
app.use(routing);

server.listen(port, "0.0.0.0");
