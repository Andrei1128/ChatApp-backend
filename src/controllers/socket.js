const io = require("../../index");
const { findChatAndAddMessage } = require("../services/chat");
const { createMessage } = require("../services/message");

io.use(require("../middlewares/socketGuard"));

io.on("connection", (socket) => {
  console.log(`${socket.id} connected..`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
  });
});

io.on("connection", (socket) => {
  socket.on("private message", async ({ message, from, id }) => {
    const foundMessage = createMessage({
      content: message,
      from: from,
    });
    io.emit(id, foundMessage);
    findChatAndAddMessage(id, foundMessage);
  });
});
