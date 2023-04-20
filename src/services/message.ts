import messageModel, { Message } from "../models/message";
import { Types } from "mongoose";

class MessageController {
  async createMessage(content: string, from: Types.ObjectId): Promise<Message> {
    const newMessage = (await messageModel.create({ content, from })).populate(
      "from"
    );
    return newMessage;
  }
}

export default new MessageController();
