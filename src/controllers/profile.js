const {
  getProfile,
  getProfiles,
  getPopulatedProfile,
  getFriends,
  getProfileByName,
} = require("../services/profile");
const { getPopulatedChat, createNewChat } = require("../services/chat");

const findChat = (req, res) => {
  const chatFound = getPopulatedChat(req.params.id);
  res.json(chatFound.messages);
};

const createChat = (req, res) => {
  try {
    const participants = getProfiles(req.body.participants);
    const newChat = createNewChat(participants);
    for (let participant of participants) {
      participant.chats.push(newChat);
      participant.save();
    }
    res.json(newChat);
  } catch (e) {
    res.sendStatus(400);
  }
};

const addFriend = async (req, res) => {
  try {
    const profileFound = getProfile(req.body.id);
    profileFound.requests.push(req.profileId);
    await profileFound.save();
    res.json(200);
  } catch (e) {
    res.sendStatus(400);
  }
};

const acceptFriend = async (req, res) => {
  try {
    const myProfile = getProfile(req.profileId);
    const otherProfile = getProfile(req.body.id);
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
    const myProfile = getProfile(req.profileId);
    myProfile.requests.remove(req.body.id);
    await myProfile.save();
    res.json(req.body.id);
  } catch (e) {
    res.sendStatus(400);
  }
};
const removeFriend = async (req, res) => {
  try {
    const myProfile = getProfile(req.profileId);
    myProfile.friends.remove(req.body.id);
    await myProfile.save();
    res.json(req.body.id);
  } catch (e) {
    res.sendStatus(400);
  }
};
const getMyProfile = (req, res) => {
  try {
    const myProfile = getPopulatedProfile(req.profileId);
    res.json(myProfile);
  } catch (e) {
    res.sendStatus(400);
  }
};
const getFriendProfile = (req, res) => {
  try {
    const profileFound = getProfile(req.body.id);
    res.json(profileFound);
  } catch (e) {
    res.sendStatus(400);
  }
};
const getAllFriendProfiles = (req, res) => {
  try {
    const myProfile = getFriends(req.profileId);
    res.json(myProfile.friends);
  } catch (e) {
    res.sendStatus(400);
  }
};
const getPeople = (req, res) => {
  try {
    const peoples = getProfileByName(req.params.nickname);
    res.json(peoples);
  } catch (e) {
    res.sendStatus(400);
  }
};

module.exports = {
  findChat,
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
