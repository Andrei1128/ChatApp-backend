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
  console.log(`${socket.handshake.auth.userID} connected..`);
  io.emit("user connected", socket.handshake.auth.userID);
  await profileModel.findByIdAndUpdate(socket.handshake.auth.userID, {
    online: true,
  });
  socket.on("disconnect", async () => {
    console.log(`${socket.handshake.auth.userID} disconnected!`);
    io.emit("user disconnected", socket.handshake.auth.userID);
    await profileModel.findByIdAndUpdate(socket.handshake.auth.userID, {
      online: false,
    });
  });
});

io.on("connection", (socket: Socket) => {
  socket.on(
    "private message",
    async (message: Message, convId: Types.ObjectId | string) => {
      await ChatService.verifyIfProfileIsInChat(
        convId as Types.ObjectId,
        socket.handshake.auth.userID
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
        io.to(participant.toString()).emit("chat message", {
          convId,
          message: {
            content: message.content,
            from: { _id: from._id, name: from.name, image: from.image },
            timestamp: Date.now(),
          },
        });
      }

      await ChatService.AddMessage(convId as Types.ObjectId, newMessage._id);
    }
  );
});
