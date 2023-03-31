import messageModel from "../models/message";
import { Types } from "mongoose";

class MessageController {
  async createMessage(
    content: string,
    from: Types.ObjectId
  ): Promise<Types.ObjectId> {
    const newMessage = await messageModel.create({ content, from });
    return newMessage._id;
  }
}

export default new MessageController();
