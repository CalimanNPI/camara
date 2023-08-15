const { io } = require("./index");

//io.configure(function () {
//  //io.set("transports", ["websocket"]);
////
//  //if (process.env.IISNODE_VERSION) {
//  //  io.set("resource", "/dante/socket.io");
//  //}
//});

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
