import { Types } from "mongoose";
import io from "../../index";
import { Message } from "../models/message";
import ChatService from "../services/chat";
import MessageService from "../services/message";
import { Socket } from "socket.io";

io.use((socket: Socket, next) => {
  const userID = socket.handshake.auth.userID;
  if (!userID) {
    return next(new Error("Invalid userID!"));
  }
  socket.join(userID);
  next();
});

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
      const newMessage = await MessageService.createMessage(
        message.content,
        message.from
      );
      io.emit(convId as string, {
        content: message.content,
        from: newMessage.from,
      });
      await ChatService.AddMessage(convId as Types.ObjectId, newMessage._id);
    }
  );
});
