const http = require("http");
const SocketIO = require("socket.io");
const express = require("express");
const app = express();
let server = http.createServer(app);
const path = require("path");

// setting
const port = process.env.PORT || 3000;

//sockts
//module.exports.io = SocketIO(server);
const io = SocketIO(server);
//require("./sockets");

//static files
app.use(express.static(path.join(__dirname, 'public')));

//app.get("/", (red, res) => {
//  res.sendfile(path.join(__dirname, "1.html"));
//});
//
//app.get("/web", (red, res) => {
//  res.sendfile(path.join(__dirname, "2.html"));
//});

//static files
//app.use(express.static(path.join(__dirname, "")));
//app.use(express.static(path.join(__dirname, "public")));

//start he server
server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log("server on port", `http:localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.broadcast.emit("connected", { connected: true });

  socket.on("stream", (data) => {
    socket.broadcast.emit("stream", data);
  });

  socket.on("ticket", (data) => {
    socket.broadcast.emit("ticket", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    socket.broadcast.emit("disconnected", { disconnect: true });
  });
});
