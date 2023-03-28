const userModel = require("../models/user");

const createUser = async ({ email, password, profile }) => {
  return await userModel.create({ email, password, profile });
};
const findUser = async (email) => {
  return await userModel.findOne({ email: email }).populate("profile");
};

module.exports = { findUser, createUser };
