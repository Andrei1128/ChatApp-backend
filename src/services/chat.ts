import { Types } from "mongoose";
import chatModel, { Chat } from "../models/chat";

class ChatService {
  async clearNotifications(convId: Types.ObjectId): Promise<void> {
    await chatModel.findByIdAndUpdate(
      convId,
      { notifications: 0 },
      { timestamps: false }
    );
  }
  async verifyIfProfileIsInChat(
    chatId: Types.ObjectId,
    profileId: Types.ObjectId
  ): Promise<void> {
    const chatFound = await chatModel.findById(chatId);
    if (chatFound) {
      const participants = chatFound.participants;
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
    const newChat = (await chatModel.create({ participants })).populate(
      "participants"
    );
    return newChat;
  }
  async createGroup(
    participants: Types.ObjectId[],
    name: string
  ): Promise<Chat> {
    const newChat = (await chatModel.create({ participants, name })).populate(
      "participants"
    );
    return newChat;
  }

  async findChat(participants: Types.ObjectId[]): Promise<Chat | undefined> {
    const chatFound = await chatModel.findOne({
      participants: { $all: participants },
    });
    if (chatFound) return chatFound;
    else return undefined;
  }

  async AddMessage(id: Types.ObjectId, message: Types.ObjectId): Promise<void> {
    await chatModel.findByIdAndUpdate(id, {
      $push: { messages: message },
      $inc: { notifications: 1 },
    });
  }

  async deleteChat(id: string): Promise<void> {
    await chatModel.findByIdAndDelete(id);
  }
}

export default new ChatService();
