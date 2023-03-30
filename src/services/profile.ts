import { Types } from "mongoose";
import profileModel from "../models/profile";

class ProfileService {
  async findProfilesAndAddChat(participants: string[], chatId: Types.ObjectId) {
    await profileModel.updateMany(
      { _id: { $in: participants } },
      { $push: { chats: chatId } }
    );
  }

  async createProfile(name: string): Promise<Types.ObjectId> {
    const newProfile = await profileModel.create({
      name,
    });
    return newProfile._id;
  }

  async getProfile(id: string) {
    const profileFound = await profileModel.findById(id);
    return profileFound;
  }

  async getProfiles(participants: string[]) {
    return await profileModel.find({
      _id: { $in: participants },
    });
  }

  async getPopulatedProfile(id: string) {
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

  async getFriends(id: string) {
    const profileFound = await profileModel.findById(id).populate("friends");
    return profileFound?.friends;
  }

  async getProfileByName(name: string) {
    return await profileModel.find({
      name: { $regex: name, $options: "i" },
    });
  }
}

export default new ProfileService();
