import io from "../../index";
import ChatService from "../services/chat";
import MessageService from "../services/message";
import { Socket } from "socket.io";
import { Types } from "mongoose";

io.on("connection", (socket: Socket) => {
  console.log(`${socket.id} connected..`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
  });
});

io.on("connection", (socket: Socket) => {
  socket.on(
    "private message",
    async (message: string, from: Types.ObjectId, id: Types.ObjectId) => {
      const messageId = await MessageService.createMessage(message, from);
      io.emit(id as unknown as string, { content: message, from: from });
      ChatService.AddMessage(id, messageId);
    }
  );
});
