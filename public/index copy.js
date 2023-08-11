const express = require("express");
const SocketIO = require("socket.io");
const path = require("path");
const http = require("http");
const app = express();

let server = http.createServer(app);

// setting
const port = process.env.PORT || 3000;

//sockts
module.exports.io = SocketIO(server);
require("./sockets");

//static files
app.use(express.static(path.join(__dirname, "public")));

//start he server
server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log("server on port", port);
});
