import { Types } from "mongoose";
import chatModel, { Chat } from "../models/chat";

class ChatService {
  async getPopulatedChat(id: string): Promise<Chat> {
    const chatFound = await chatModel
      .findById(id)
      .populate("messages")
      .populate({ path: "messages", populate: { path: "from" } });
    if (chatFound) return chatFound;
    else throw new Error("Chat not found!");
  }

  async createChat(participants: Types.ObjectId[]): Promise<Chat> {
    const newChat = await chatModel.create({ participants });
    return newChat;
  }

  async AddMessage(id: Types.ObjectId, message: Types.ObjectId): Promise<void> {
    const chatFound = await chatModel.findById(id);
    if (chatFound) {
      chatFound?.messages.push(message);
      await chatFound?.save();
    } else throw new Error("Chat not found!");
  }
}

export default new ChatService();
