const chatModel = require("../models/chat");

const getPopulatedChat = async (id) => {
  return await chatModel
    .findById(id)
    .populate("messages")
    .populate({ path: "messages", populate: { path: "from" } });
};
const createChat = async (participants) => {
  return await chatModel.create({ participants });
};
const findChatAndAddMessage = async (id, message) => {
  const conv = await chatModel.findById(id);
  conv.messages.push(message);
  await conv.save();
};

module.exports = { getPopulatedChat, createChat, findChatAndAddMessage };
