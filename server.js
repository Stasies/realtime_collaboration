import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 1234;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      socket.roomId = roomId; // Save it in the socket object
      console.log("room joined with id", socket.roomId);
    });
    socket.on("noteCreated", async (val) => {
      console.log("note created");

      // console.log(savedNote);
    });
    socket.on("message", (val) => {
      console.log("Received message:", val);
      socket.emit("response", { message: "received" });
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });

  global.io = io;
});
