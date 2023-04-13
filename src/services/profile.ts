import { Types } from "mongoose";
import profileModel, { Profile } from "../models/profile";

class ProfileService {
  async addChat(
    participants: Types.ObjectId[],
    chatId: Types.ObjectId
  ): Promise<void> {
    await profileModel.updateMany(
      { _id: { $in: participants } },
      { $push: { chats: chatId } }
    );
  }

  async addRequest(id: Types.ObjectId, myId: Types.ObjectId): Promise<void> {
    await profileModel.findByIdAndUpdate(id, { $push: { requests: myId } });
  }

  async addFriendAndRemoveRequest(
    id: Types.ObjectId,
    friendId: Types.ObjectId
  ): Promise<void> {
    await profileModel.findByIdAndUpdate(id, {
      $push: { friends: friendId },
      $pull: { requests: friendId },
    });
  }

  async addFriend(id: Types.ObjectId, friendId: Types.ObjectId): Promise<void> {
    await profileModel.findByIdAndUpdate(id, {
      $push: { friends: friendId },
    });
  }

  async removeFriend(
    id: Types.ObjectId,
    friendId: Types.ObjectId
  ): Promise<Types.ObjectId> {
    const friendProfile = await profileModel.findByIdAndUpdate(friendId, {
      $pull: { friends: id },
    });
    if (friendProfile) {
      await profileModel.findByIdAndUpdate(id, {
        $pull: { friends: friendId },
      });
      return friendProfile._id;
    } else throw new Error("Profile not found!");
  }

  async removeRequest(
    id: Types.ObjectId,
    declinedId: Types.ObjectId
  ): Promise<void> {
    await profileModel.findByIdAndUpdate(id, {
      $pull: { requests: declinedId },
    });
  }

  async createProfile(name: string): Promise<Types.ObjectId> {
    const newProfile = await profileModel.create({
      name,
    });
    return newProfile._id;
  }

  async getProfile(id: Types.ObjectId): Promise<Profile> {
    const profileFound = await profileModel.findById(id);
    if (profileFound) return profileFound;
    else throw new Error("Profile not found!");
  }

  async getProfiles(participants: Types.ObjectId[]): Promise<Profile[]> {
    return await profileModel.find({
      _id: { $in: participants },
    });
  }

  async getPopulatedProfile(id: Types.ObjectId): Promise<Profile> {
    const profileFound = await profileModel
      .findById(id)
      .populate("friends")
      .populate("requests")
      .populate("chats")
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
    if (profileFound) return profileFound;
    else throw new Error("Profile not found!");
  }

  async getRequests(id: Types.ObjectId): Promise<Types.ObjectId[]> {
    const profileFound = await profileModel.findById(id).populate("requests");
    if (profileFound) return profileFound.requests;
    else throw new Error("Profile not found!");
  }

  async getFriends(id: Types.ObjectId): Promise<Types.ObjectId[]> {
    const profileFound = await profileModel.findById(id).populate("friends");
    if (profileFound) return profileFound.friends;
    else throw new Error("Profile not found!");
  }

  async getProfileByName(name: string): Promise<Profile[]> {
    return await profileModel.find({
      name: { $regex: name, $options: "i" },
    });
  }
}

export default new ProfileService();
