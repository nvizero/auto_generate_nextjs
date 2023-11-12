import { Server } from "http";
import { startWebSocketServer } from "../../socket-server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  if (!res.socket.server) {
    res.socket.server = Server;
    startWebSocketServer(res.socket.server);
  }
  res.end();
};
