const express = require("express");
const SocketIO = require("socket.io");
const path = require("path");
const http = require("http");
const app = express();
const fs = require("fs");
let server = http.createServer(app);

// setting
const port = process.env.PORT || 3000;

//sockts 
module.exports.io = SocketIO(server);
require("./sockets");

function handler(req, res) {
  fs.readFile(
    path.resolve(__dirname, "index-socketio.html"),
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading index-socketio.html");
      }

      res.writeHead(200);
      res.end(data);
    }
  );
}

//static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "")));

//start he server
server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log("server on port", port);
});
