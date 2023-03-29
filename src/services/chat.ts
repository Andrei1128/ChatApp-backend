import mongoose from "mongoose";
import chatModel from "../models/chat";

async function getPopulatedChat(id: string) {
  return await chatModel
    .findById(id)
    .populate("messages")
    .populate({ path: "messages", populate: { path: "from" } });
}
async function createNewChat(participants: string[]) {
  const newChat = await chatModel.create({ participants });
  return newChat;
}
async function findChatAndAddMessage(
  id: string,
  message: mongoose.Types.ObjectId
) {
  const conv = await chatModel.findById(id);
  if (conv == null) throw new Error("Sugi");
  conv?.messages.push(message);
  await conv?.save();
}

export { getPopulatedChat, createNewChat, findChatAndAddMessage };
