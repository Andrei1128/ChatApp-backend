import { Message } from "../interfaces/message";
import messageModel from "../models/message";

async function createMessage(msg: Message) {
  const newMessage = await messageModel.create(msg);
  return newMessage._id;
}

export { createMessage };
