const profileModel = require("../models/profile");

const createProfile = async (nickname) => {
  return await profileModel.create({
    nickname: nickname,
  });
};
const getProfile = async (id) => {
  try {
    return await profileModel.findById(id);
  } catch (e) {}
};
const getProfiles = async (participants) => {
  return await profileModel.find({
    _id: { $in: participants },
  });
};
const getPopulatedProfile = async (id) => {
  return await profileModel
    .findById(id)
    .populate("chats")
    .populate("friends")
    .populate("requests")
    .populate({
      path: "chats",
      populate: {
        path: "participants",
      },
    })
    .populate({
      path: "chats",
      populate: {
        path: "messages",
        populate: {
          path: "from",
        },
      },
    });
};
const getFriends = async (id) => {
  return await profileModel.findById(id).populate("friends").friends;
};
const getProfileByName = async (name) => {
  return await profileModel.find({
    nickname: { $regex: name, $options: "i" },
  });
};

module.exports = {
  createProfile,
  getProfile,
  getProfiles,
  getPopulatedProfile,
  getFriends,
  getProfileByName,
};
