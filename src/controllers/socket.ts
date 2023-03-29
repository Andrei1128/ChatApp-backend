import { io } from "../../index";
import { findChatAndAddMessage } from "../services/chat";
import { createMessage } from "../services/message";
import { Socket } from "socket.io";

io.on("connection", (socket: Socket) => {
  console.log(`${socket.id} connected..`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
  });
});

io.on("connection", (socket: Socket) => {
  socket.on(
    "private message",
    async (message: string, from: string, id: string) => {
      const messageId = await createMessage({
        content: message,
        from,
      });
      io.emit(id, { content: message, from: from });
      findChatAndAddMessage(id, messageId);
    }
  );
});
