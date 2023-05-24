import { Types } from "mongoose";
import chatModel, { Chat, UserUtil } from "../models/chat";

class ChatService {
  async clearNotifications(
    convId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<void> {
    const chatFound = await chatModel.findById(convId);
    if (chatFound) {
      chatFound.userUtil = chatFound.userUtil.map((u) => {
        if (u.userId === userId.toString()) u.notifications = 0;
        return u;
      });
      await chatModel.findByIdAndUpdate(
        convId,
        { userUtil: chatFound.userUtil },
        { timestamps: false }
      );
    } else throw new Error("Chat not found!");
  }
  async verifyIfProfileIsInChat(
    chatId: Types.ObjectId,
    profileId: Types.ObjectId
  ): Promise<void> {
    const chatFound = await chatModel.findById(chatId);
    if (chatFound) {
      const participants = chatFound.participants;
      if (participants.length == 0) return;
      for (const participant of participants) {
        if (participant.toString() === profileId.toString()) {
          return;
        }
      }
      throw new Error("Profile not in chat participants!");
    } else throw new Error("Chat not found!");
  }

  async findAndUpdateName(id: Types.ObjectId, name: string): Promise<Chat> {
    const chat = await chatModel.findByIdAndUpdate(id, { name: name });
    if (chat) {
      return chat;
    } else throw new Error("Chat not found!");
  }

  async findAndUpdateAbout(id: Types.ObjectId, about: string): Promise<Chat> {
    const chat = await chatModel.findByIdAndUpdate(id, { about: about });
    if (chat) {
      return chat;
    } else throw new Error("Chat not found!");
  }
  async findAndUpdateImage(id: Types.ObjectId, image: string): Promise<Chat> {
    const chat = await chatModel.findByIdAndUpdate(id, { image: image });
    if (chat) {
      return chat;
    } else throw new Error("Chat not found!");
  }

  async getChatParticipants(id: string): Promise<Types.ObjectId[]> {
    const chatFound = await chatModel.findById(id);
    if (chatFound) return chatFound.participants;
    else throw new Error("Chat not found!");
  }

  async createChat(participants: Types.ObjectId[]): Promise<Chat> {
    const userUtil: UserUtil[] = [];
    for (const participant of participants) {
      userUtil.push({
        userId: participant.toString(),
        deletedAt: new Date(),
        notifications: 0,
      });
    }
    const newChat = (
      await chatModel.create({ participants, userUtil })
    ).populate("participants");
    return newChat;
  }
  async createGroup(
    participants: Types.ObjectId[],
    name: string
  ): Promise<Chat> {
    const userUtil: UserUtil[] = [];
    for (const participant of participants) {
      userUtil.push({
        userId: participant.toString(),
        deletedAt: new Date(),
        notifications: 0,
      });
    }
    const newChat = (
      await chatModel.create({ participants, name, userUtil })
    ).populate("participants");
    return newChat;
  }

  async createProjChat(name: string): Promise<Chat> {
    const newChat = await chatModel.create({ name });
    return newChat;
  }

  async findChat(participants: Types.ObjectId[]): Promise<Chat | undefined> {
    const chatFound = await chatModel.findOne({
      participants: { $all: participants },
    });
    if (chatFound) return chatFound;
    else return undefined;
  }

  async AddMessage(
    id: Types.ObjectId,
    message: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<void> {
    const chatFound = await chatModel.findById(id);
    if (chatFound) {
      chatFound.userUtil = chatFound.userUtil.map((u) => {
        if (u.userId !== userId.toString())
          u.notifications = u.notifications + 1;
        return u;
      });
      await chatModel.findByIdAndUpdate(id, {
        $push: { messages: message },
        userUtil: chatFound.userUtil,
      });
    } else throw new Error("Chat not found!");
  }

  async deleteChat(id: string, userId: Types.ObjectId): Promise<void> {
    const chatFound = await chatModel.findById(id);
    if (chatFound) {
      chatFound.userUtil = chatFound.userUtil.map((u) => {
        if (u.userId === userId.toString()) u.deletedAt = new Date();
        return u;
      });
      await chatModel.findByIdAndUpdate(id, {
        userUtil: chatFound.userUtil,
      });
    } else throw new Error("Chat not found!");
  }
}

export default new ChatService();
