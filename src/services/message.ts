import messageModel, { Message } from "../models/message";
import { Types } from "mongoose";

class MessageController {
  async createMessage(
    content: string,
    from: Types.ObjectId,
    timestamp: number
  ): Promise<Message> {
    const newMessage = (
      await messageModel.create({ content, from, timestamp })
    ).populate("from");
    return newMessage;
  }
}

export default new MessageController();
