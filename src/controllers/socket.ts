import { Types } from "mongoose";
import io from "../../index";
import { Message } from "../models/message";
import ChatService from "../services/chat";
import MessageService from "../services/message";
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
    async (message: Message, convId: Types.ObjectId | string) => {
      console.log(message);
      const messageId = await MessageService.createMessage(
        message.content,
        message.from
      );
      io.emit(convId as string, {
        content: message.content,
        from: message.from,
      });
      await ChatService.AddMessage(convId as Types.ObjectId, messageId);
    }
  );
});
