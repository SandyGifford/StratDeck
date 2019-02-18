import * as express from "express";
import * as path from "path";
const app = express();

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));
app.get("/assets/*", (req, res) => res.sendFile(path.join(__dirname, "../", req.url)));
app.get("/build/*", (req, res) => res.sendFile(path.join(__dirname, "../", req.url)));

export default app;
