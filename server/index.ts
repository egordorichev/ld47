const HOST = "localhost"

import http from "http";
import express from "express";
import cors from "cors";

import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { GameRoom } from "./room";

const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())

const server = http.createServer(app);
const gameServer = new Server({
  server
});

gameServer.define('room', GameRoom);

app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://${HOST}:${port}`)