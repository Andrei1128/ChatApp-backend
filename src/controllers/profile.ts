import ProfileService from "../services/profile";
import { Request, Response } from "express";

class ProfileController {
  async addFriend(req: Request, res: Response) {
    await ProfileService.addRequest(req.body.id, req.myProfileID);
    res.json(200);
  }

  async acceptFriend(req: Request, res: Response) {
    const friendId = req.body.id;
    console.log(req.body);
    await ProfileService.addFriend(friendId, req.myProfileID);
    await ProfileService.addFriendAndRemoveRequest(
      req.myProfileID,
      req.body.id
    );
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
    const profileFound = await ProfileService.getProfile(req.body.id);
    res.json(profileFound);
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
