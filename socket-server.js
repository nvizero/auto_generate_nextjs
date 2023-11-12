const { Server } = require("socket.io");

const startWebSocketServer = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
      io.emit("message", data); // 发送消息给所有连接的客户端
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = startWebSocketServer;
