import { Types } from "mongoose";
import messageModel, { Message } from "../models/message";
import { Profile } from "../models/profile";

class MessageController {
  async createMessage(
    content: string,
    from?: Profile | Types.ObjectId
  ): Promise<Message> {
    const newMessage = (await messageModel.create({ content, from })).populate(
      "from"
    );
    return newMessage;
  }
}

export default new MessageController();
