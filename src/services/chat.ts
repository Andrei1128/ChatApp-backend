import { Types } from "mongoose";
import chatModel, { Chat } from "../models/chat";

class ChatService {
  async findAndUpdateName(
    id: Types.ObjectId,
    name: string
  ): Promise<Types.ObjectId[]> {
    const chat = await chatModel.findByIdAndUpdate(id, { name: name });
    if (chat) {
      return chat.participants;
    } else throw new Error("Chat not found!");
  }

  async findAndUpdateAbout(
    id: Types.ObjectId,
    about: string
  ): Promise<Types.ObjectId[]> {
    const chat = await chatModel.findByIdAndUpdate(id, { about: about });
    if (chat) {
      return chat.participants;
    } else throw new Error("Chat not found!");
  }
  async findAndUpdateImage(
    id: Types.ObjectId,
    image: string
  ): Promise<Types.ObjectId[]> {
    const chat = await chatModel.findByIdAndUpdate(id, { image: image });
    if (chat) {
      return chat.participants;
    } else throw new Error("Chat not found!");
  }

  async getChat(id: string): Promise<Chat> {
    const chatFound = await chatModel.findById(id).populate("participants");
    if (chatFound) return chatFound;
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
    await chatModel.findByIdAndUpdate(id, { $push: { messages: message } });
  }

  async deleteChat(id: string): Promise<void> {
    await chatModel.findByIdAndDelete(id);
  }
}

export default new ChatService();
