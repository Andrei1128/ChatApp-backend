import { Types } from "mongoose";
import chatModel from "../models/chat";

class ChatService {
  async getPopulatedChat(id: string): Promise<any> {
    return await chatModel
      .findById(id)
      .populate("messages")
      .populate({ path: "messages", populate: { path: "from" } });
  }

  async createNewChat(participants: string[]): Promise<any> {
    const newChat = await chatModel.create({ participants });
    return newChat;
  }

  async findChatAndAddMessage(
    id: string,
    message: Types.ObjectId
  ): Promise<any> {
    const conv = await chatModel.findById(id);
    if (conv == null) throw new Error("Sugi");
    conv?.messages.push(message);
    await conv?.save();
  }
}

export default new ChatService();
