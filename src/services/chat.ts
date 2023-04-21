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
    const newChat = (await chatModel.create({ participants })).populate(
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
    await chatModel.findByIdAndUpdate(id, { $push: { messages: message } });
  }

  async deleteChat(id: string): Promise<void> {
    await chatModel.findByIdAndDelete(id);
  }
}

export default new ChatService();
