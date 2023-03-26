const profileModel = require("../model/profile");
const chatModel = require("../model/chat");

const createChat = async (req, res) => {
  try {
    const profileFound = await profileModel.findById(req.body.id);
    const myProfile = await profileModel.findById(req.profileId);
    const newChat = await chatModel.create({
      participants: [profileFound, myProfile],
    });
    profileFound.chats.push(newChat);
    myProfile.chats.push(newChat);
    await profileFound.save();
    await myProfile.save();
    res.json(newChat);
  } catch (e) {
    res.sendStatus(400);
  }
};
const addFriend = async (req, res) => {
  try {
    const profileFound = await profileModel.findById(req.body.id);
    profileFound.requests.push(req.profileId);
    await profileFound.save();
    res.json(200);
  } catch (e) {
    res.sendStatus(400);
  }
};

const acceptFriend = async (req, res) => {
  try {
    const myProfile = await profileModel.findById(req.profileId);
    const otherProfile = await profileModel.findById(req.body.id);
    myProfile.requests.remove(req.body.id);
    myProfile.friends.push(req.body.id);
    otherProfile.chats.push(req.profileId);
    await myProfile.save();
    await otherProfile.save();
    res.json(otherProfile);
  } catch (e) {
    res.sendStatus(400);
  }
};
const declineFriend = async (req, res) => {
  try {
    const myProfile = await profileModel.findById(req.profileId);
    myProfile.requests.remove(req.body.id);
    await myProfile.save();
    res.json(req.body.id);
  } catch (e) {
    res.sendStatus(400);
  }
};
const removeFriend = async (req, res) => {
  try {
    const myProfile = await profileModel.findById(req.profileId);
    myProfile.friends.remove(req.body.id);
    await myProfile.save();
    res.json(req.body.id);
  } catch (e) {
    res.sendStatus(400);
  }
};
const getMyProfile = async (req, res) => {
  try {
    const myProfile = await profileModel
      .findById(req.profileId)
      .populate("chats")
      .populate("friends")
      .populate({
        path: "chats",
        populate: {
          path: "participants",
        },
      });
    res.json(myProfile);
  } catch (e) {
    res.sendStatus(400);
  }
};
const getFriendProfile = async (req, res) => {
  try {
    const profileFound = await profileModel.findById(req.params.id);
    res.json(profileFound);
  } catch (e) {
    res.sendStatus(400);
  }
};
const getAllFriendProfiles = async (req, res) => {
  try {
    const myProfile = await profileModel
      .findById(req.profileId)
      .populate("friends");
  } catch (e) {
    res.sendStatus(400);
  }
  res.json(myProfile.friends);
};
const getPeople = async (req, res) => {
  try {
    const peoples = await profileModel.find({
      nickname: { $regex: req.params.nickname, $options: "i" },
    });
    res.json(peoples);
  } catch (e) {
    res.sendStatus(400);
  }
};

module.exports = {
  createChat,
  addFriend,
  acceptFriend,
  declineFriend,
  removeFriend,
  getMyProfile,
  getFriendProfile,
  getAllFriendProfiles,
  getPeople,
};
