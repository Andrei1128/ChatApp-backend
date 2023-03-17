const profileModel = require("../model/profile");

const add = async (req, res) => {
  try {
    const profileFound = await profileModel.findById(req.params.id);
    profileFound.requests.push(req.profileId);
    await profileFound.save();
    res.status(200).send("Friend request sent!");
  } catch (e) {
    res.status(400).send("Profile not found!");
  }
};

const accept = async (req, res) => {
  const myProfile = await profileModel.findById(req.profileId);
  const otherProfile = await profileModel.findById(req.params.id);
  myProfile.requests.remove(req.params.id);
  myProfile.friends.push(req.params.id);
  otherProfile.friends.push(req.profileId);
  await myProfile.save();
  await otherProfile.save();
  res.status(200).send("Friend request accepted!");
};
const decline = async (req, res) => {
  const myProfile = await profileModel.findById(req.profileId);
  myProfile.requests.remove(req.params.id);
  await myProfile.save();
  res.status(200).send("Friend request declined!");
};
const getMe = async (req, res) => {
  res.json(await profileModel.findById(req.profileId));
};
const get = async (req, res) => {
  try {
    const profileFound = await profileModel.findById(req.params.id);
    res.json(profileFound);
  } catch (e) {
    res.status(400).send("Profile not found!");
  }
};
const getAll = async (req, res) => {
  const myProfile = await profileModel
    .findById(req.profileId)
    .populate("friends");
  res.json(myProfile.friends);
};

module.exports = { add, accept, decline, get, getMe, getAll };
