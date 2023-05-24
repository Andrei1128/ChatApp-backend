import { Types } from "mongoose";
import profileModel, { Profile } from "../models/profile";
import { Chat } from "../models/chat";
import messageModel from "../models/message";

class ProfileService {
  async findByIdAndUpdateName(id: Types.ObjectId, name: string): Promise<void> {
    await profileModel.findByIdAndUpdate(id, { name: name });
  }

  async findByIdAndUpdateAbout(
    id: Types.ObjectId,
    about: string
  ): Promise<Types.ObjectId[]> {
    const profile = await profileModel.findByIdAndUpdate(id, { about: about });
    if (profile) return profile.friends;
    else throw new Error("Profile not found!");
  }

  async findByIdAndUpdateImage(
    id: Types.ObjectId,
    image: string
  ): Promise<void> {
    await profileModel.findByIdAndUpdate(id, { image: image });
  }

  async addChat(
    participants: Types.ObjectId[],
    chatId: Types.ObjectId
  ): Promise<void> {
    await profileModel.updateMany(
      { _id: { $in: participants } },
      { $push: { chats: chatId } }
    );
  }
  async addProject(
    participants: Types.ObjectId[],
    projectId: Types.ObjectId
  ): Promise<void> {
    await profileModel.updateMany(
      { _id: { $in: participants } },
      { $push: { projects: projectId } }
    );
  }
  async addRequest(id: Types.ObjectId, myId: Types.ObjectId): Promise<void> {
    await profileModel.findByIdAndUpdate(id, { $push: { requests: myId } });
  }

  async addFriendAndRemoveRequest(
    id: Types.ObjectId,
    friendId: Types.ObjectId
  ): Promise<Profile> {
    const profile = await profileModel.findByIdAndUpdate(id, {
      $push: { friends: friendId },
      $pull: { requests: friendId },
    });
    if (profile) return profile;
    else throw new Error("Profile not found!");
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

  async getProfile(id: string | Types.ObjectId): Promise<Profile> {
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
      .populate({
        path: "projects",
        populate: {
          path: "chats",
          populate: {
            path: "messages",
            populate: {
              path: "from",
            },
          },
        },
      })
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
        },
        options: {
          sort: { updatedAt: 1 },
        },
      });
    if (profileFound) {
      const chats = profileFound.chats;
      for (const chat of chats as unknown as Chat[]) {
        const messages = await messageModel
          .find({
            _id: { $in: chat.messages },
            createdAt: { $gte: this.getDeletedAt(chat, profileFound._id) },
          })
          .populate("from");
        chat.messages = messages;
      }
      return profileFound;
    } else {
      throw new Error("Profile not found!");
    }
  }

  getDeletedAt(chat: Chat, myId: Types.ObjectId) {
    const myUtil = chat.userUtil.find((u) => u.userId === myId.toString());
    if (myUtil) return myUtil.deletedAt;
    else {
      const date = new Date();
      date.setFullYear(2000, 0, 1);
      return date;
    }
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
  async joinProject(
    projId: Types.ObjectId,
    myId: Types.ObjectId
  ): Promise<void> {
    await profileModel.findByIdAndUpdate(myId, {
      $push: { projects: projId },
    });
  }
}

export default new ProfileService();
