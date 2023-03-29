import profileModel from "../models/profile";

async function createProfile(nickname: string) {
  return await profileModel.create({
    nickname,
  });
}
async function getProfile(id: string) {
  try {
    const profileFound = await profileModel.findById(id);
    return profileFound;
  } catch (e) {
    console.log(e);
  }
}
async function getProfiles(participants: string[]) {
  return await profileModel.find({
    _id: { $in: participants },
  });
}
async function getPopulatedProfile(id: string) {
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
}
async function getFriends(id: string) {
  const profileFound = await profileModel.findById(id).populate("friends");
  return profileFound?.friends;
}
async function getProfileByName(name: string) {
  return await profileModel.find({
    nickname: { $regex: name, $options: "i" },
  });
}

export {
  createProfile,
  getProfile,
  getProfiles,
  getPopulatedProfile,
  getFriends,
  getProfileByName,
};
