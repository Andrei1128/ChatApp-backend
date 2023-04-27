import ProfileService from "../services/profile";
import { Request, Response } from "express";
import io from "../../index";

class ProfileController {
  async updateName(req: Request, res: Response) {
    await ProfileService.findByIdAndUpdateName(req.myProfileID, req.body.name);
    res.status(200).json("Succes!");
  }
  async updateAbout(req: Request, res: Response) {
    await ProfileService.findByIdAndUpdateAbout(
      req.myProfileID,
      req.body.about
    );
    res.status(200).json("Succes!");
  }
  async updateImage(req: Request, res: Response) {
    await ProfileService.findByIdAndUpdateImage(
      req.myProfileID,
      req.body.image
    );
    res.status(200).json("Succes!");
  }

  async acceptFriend(req: Request, res: Response) {
    const friendId = req.body.id;
    const myId = req.myProfileID;
    await ProfileService.addFriend(friendId, myId);
    const myProfile = await ProfileService.addFriendAndRemoveRequest(
      myId,
      req.body.id
    );
    io.to(friendId).emit("new friend", myProfile);
    res.json(200);
  }

  async addFriend(req: Request, res: Response) {
    await ProfileService.addRequest(req.body.id, req.myProfileID);
    const myProfile = await ProfileService.getProfile(req.myProfileID);
    io.to(req.body.id).emit("new request", myProfile);
    res.json(200);
  }

  async declineFriend(req: Request, res: Response) {
    const declinedId = req.body.id;
    await ProfileService.removeRequest(req.myProfileID, declinedId);
    res.json(200);
  }

  async removeFriend(req: Request, res: Response) {
    const removedFriendId = req.body.id;
    await ProfileService.removeFriend(req.myProfileID, removedFriendId);
    io.to(removedFriendId).emit("rem friend", req.myProfileID);
    res.json(removedFriendId);
  }

  async getRequests(req: Request, res: Response) {
    const requests = await ProfileService.getRequests(req.myProfileID);
    res.json(requests);
  }

  async getMyProfile(req: Request, res: Response) {
    const myProfile = await ProfileService.getPopulatedProfile(req.myProfileID);
    res.json(myProfile);
  }

  async getFriendProfile(req: Request, res: Response) {
    const profileFound = await ProfileService.getProfile(req.params.id);
    res.json({
      name: profileFound.name,
      image: profileFound.image,
      about: profileFound.about,
      online: profileFound.online,
    });
  }

  async getFriendsProfiles(req: Request, res: Response) {
    const friends = await ProfileService.getFriends(req.myProfileID);
    res.json(friends);
  }

  async getPeople(req: Request, res: Response) {
    const peoples = await ProfileService.getProfileByName(req.params.name);
    res.json(peoples);
  }
}
export default new ProfileController();
