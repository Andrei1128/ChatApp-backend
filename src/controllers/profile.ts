import ProfileService from "../services/profile";
import ChatService from "../services/chat";
import { Request, Response } from "express";

class ProfileController {
  async findChat(req: Request, res: Response): Promise<any> {
    const chatFound = await ChatService.getPopulatedChat(req.params.id);
    res.json(chatFound?.messages);
  }

  async createChat(req: Request, res: Response): Promise<any> {
    // try {
    const participants = req.body.participants;
    const newChat = await ChatService.createNewChat(participants);
    ProfileService.findProfilesAndAddChat(participants, newChat._id);
    res.json(newChat);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }

  async addFriend(req: Request, res: Response): Promise<any> {
    // try {
    const profileFound = await ProfileService.getProfile(req.body.id);
    // profileFound?.requests.push(req.headers["myProfileId"]);
    await profileFound?.save();
    res.json(200);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }

  async acceptFriend(req: Request, res: Response): Promise<any> {
    // try {
    const myProfile = await ProfileService.getProfile(
      req.headers["myProfileId"] as string
    );
    const otherProfile = await ProfileService.getProfile(req.body.id);
    // myProfile?.requests.remove(req.body.id);
    myProfile?.friends.push(req.body.id);
    // otherProfile?.friends.push(req.headers["myProfileId"]);
    myProfile?.save();
    otherProfile?.save();
    res.json(otherProfile);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }
  async declineFriend(req: Request, res: Response): Promise<any> {
    // try {
    const myProfile = await ProfileService.getProfile(
      req.headers["myProfileId"] as string
    );
    // myProfile?.requests.remove(req.body.id);
    myProfile?.save();
    res.json(req.body.id);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }
  async removeFriend(req: Request, res: Response): Promise<any> {
    // try {
    const myProfile = await ProfileService.getProfile(
      req.headers["myProfileId"] as string
    );
    // myProfile?.friends.remove(req.body.id);
    myProfile?.save();
    res.json(req.body.id);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }
  async getMyProfile(req: Request, res: Response): Promise<any> {
    // try {
    const myProfile = await ProfileService.getPopulatedProfile(
      req.headers["myProfileId"] as string
    );
    res.json(myProfile);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }
  async getFriendProfile(req: Request, res: Response): Promise<any> {
    // try {
    const profileFound = await ProfileService.getProfile(req.body.id);
    res.json(profileFound);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }
  async getAllFriendProfiles(req: Request, res: Response): Promise<any> {
    // try {
    const myProfile = await ProfileService.getFriends(
      req.headers["myProfileId"] as string
    );
    // res.json(myProfile?.friends);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }
  async getPeople(req: Request, res: Response): Promise<any> {
    // try {
    const peoples = await ProfileService.getProfileByName(req.params.name);
    res.json(peoples);
    // } catch (e) {
    //   res.sendStatus(400);
    // }
  }
}
export default new ProfileController();
