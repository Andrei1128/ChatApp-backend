import { Types } from "mongoose";
import io from "../../index";
import { Message } from "../models/message";
import ChatService from "../services/chat";
import MessageService from "../services/message";
import { Socket } from "socket.io";
import profileModel from "../models/profile";

io.use((socket: Socket, next) => {
  const userID = socket.handshake.auth.userID;
  if (!userID) {
    return next(new Error("Invalid userID!"));
  }
  socket.join(userID);
  next();
});

io.on("connection", async (socket: Socket) => {
  const userId = socket.handshake.auth.userID;
  console.log(`${userId} connected..`);
  io.emit("user connected", userId);
  await profileModel.findByIdAndUpdate(userId, {
    online: true,
  });
  socket.on("disconnect", async () => {
    console.log(`${userId} disconnected!`);
    io.emit("user disconnected", userId);
    await profileModel.findByIdAndUpdate(userId, {
      online: false,
    });
  });
});

io.on("connection", (socket: Socket) => {
  const senderId = socket.handshake.auth.userID;
  socket.on(
    "private message",
    async (message: Message, convId: Types.ObjectId | string) => {
      await ChatService.verifyIfProfileIsInChat(
        convId as Types.ObjectId,
        senderId
      );
      const newMessage = await MessageService.createMessage(
        message.content,
        message.from
      );
      const participants = await ChatService.getChatParticipants(
        convId as string
      );
      const from = newMessage.from;
      for (const participant of participants) {
        if (participant.toString() !== senderId)
          io.to(participant.toString()).emit("chat message", {
            convId,
            message: {
              content: message.content,
              from: { _id: from._id, name: from.name, image: from.image },
            },
          });
      }

      await ChatService.AddMessage(convId as Types.ObjectId, newMessage._id);
    }
  );
  socket.on("clear notifications", async (convId: Types.ObjectId) => {
    await ChatService.verifyIfProfileIsInChat(convId, senderId);
    await ChatService.clearNotifications(convId);
  });
});
