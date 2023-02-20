import express from "express";
import http from "http";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { PORT } from "./config.js";
import cors from "cors";

// Initializations
const app = express();
const server = http.createServer(app)
const io = new SocketServer(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  // },
});
const __dirname = dirname(fileURLToPath(import.meta.url));
let coutUser = 0;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "../client/build")));

io.on("connection", (socket) => {
  console.log(socket.id);
  coutUser += 1;
  console.log(coutUser);
  
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(5),
    });
    socket.broadcast.emit('active', coutUser)
  });

  socket.on("disconnect", () => {
    console.log("user desconectado")
    coutUser -= 1;
    console.log(coutUser);
  })
});


server.listen(PORT);
console.log(`server on port ${PORT}`);
