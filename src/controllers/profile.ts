import {
  getProfile,
  getProfiles,
  getPopulatedProfile,
  getFriends,
  getProfileByName,
} from "../services/profile";
import { getPopulatedChat, createNewChat } from "../services/chat";
import { Request, Response } from "express";

const findChat = async (req: Request, res: Response) => {
  const chatFound = await getPopulatedChat(req.params.id);
  res.json(chatFound?.messages);
};

const createChat = async (req: Request, res: Response) => {
  // try {
  const participants = await getProfiles(req.body.participants);
  const newChat = await createNewChat(participants);
  for (const participant of participants) {
    participant.chats.push(newChat._id);
    participant.save();
  }
  res.json(newChat);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};

const addFriend = async (req: Request, res: Response) => {
  // try {
  const profileFound = await getProfile(req.body.id);
  profileFound?.requests.push(req.headers["myProfileId"]);
  await profileFound?.save();
  res.json(200);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};

const acceptFriend = async (req: Request, res: Response) => {
  // try {
  const myProfile = await getProfile(req.headers["myProfileId"] as string);
  const otherProfile = await getProfile(req.body.id);
  myProfile?.requests.remove(req.body.id);
  myProfile?.friends.push(req.body.id);
  otherProfile?.friends.push(req.headers["myProfileId"]);
  myProfile?.save();
  otherProfile?.save();
  res.json(otherProfile);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};
const declineFriend = async (req: Request, res: Response) => {
  // try {
  const myProfile = await getProfile(req.headers["myProfileId"] as string);
  myProfile?.requests.remove(req.body.id);
  myProfile?.save();
  res.json(req.body.id);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};
const removeFriend = async (req: Request, res: Response) => {
  // try {
  const myProfile = await getProfile(req.headers["myProfileId"] as string);
  myProfile?.friends.remove(req.body.id);
  myProfile?.save();
  res.json(req.body.id);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};
const getMyProfile = async (req: Request, res: Response) => {
  // try {
  const myProfile = await getPopulatedProfile(
    req.headers["myProfileId"] as string
  );
  res.json(myProfile);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};
const getFriendProfile = async (req: Request, res: Response) => {
  // try {
  const profileFound = await getProfile(req.body.id);
  res.json(profileFound);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};
const getAllFriendProfiles = async (req: Request, res: Response) => {
  // try {
  const myProfile = await getFriends(req.headers["myProfileId"] as string);
  res.json(myProfile?.friends);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};
const getPeople = async (req: Request, res: Response) => {
  // try {
  const peoples = await getProfileByName(req.params.nickname);
  res.json(peoples);
  // } catch (e) {
  //   res.sendStatus(400);
  // }
};

export {
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
