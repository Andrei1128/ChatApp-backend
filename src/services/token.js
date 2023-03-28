const tokenModel = require("../models/token");

const createToken = async (token) => {
  await tokenModel.create({ content: token });
};
const deleteToken = async (token) => {
  await tokenModel.findOneAndDelete({ content: token });
};
module.exports = { createToken, deleteToken };
