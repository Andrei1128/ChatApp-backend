const messageModel = require("../models/message");

const createMessage = async ({ content, from }) => {
  const newMessage = await messageModel.create({ content, from });
  const foundMessage = await messageModel
    .findById(newMessage._id)
    .populate("from");
  return foundMessage;
};

module.exports = { createMessage };
