import { Types } from "mongoose";
import ChatService from "../services/chat";
import ProfileService from "../services/profile";
import { Request, Response } from "express";

class ChatController {
  async findChat(req: Request, res: Response) {
    const chatFound = await ChatService.getChat(req.params.id);
    res.json({
      _id: chatFound._id,
      name: chatFound.name,
      image: chatFound.image,
      about: chatFound.about,
      participants: chatFound.participants,
    });
  }

  async updateImage(req: Request, res: Response) {
    await ChatService.findAndUpdateImage(req.body.id, req.body.imageBuffer);
    res.status(200).json("Succes!");
  }
  async updateName(req: Request, res: Response) {
    await ChatService.findAndUpdateName(req.body.id, req.body.name);
    res.status(200).json("Succes!");
  }
  async updateAbout(req: Request, res: Response) {
    await ChatService.findAndUpdateAbout(req.body.id, req.body.about);
    res.status(200).json("Succes!");
  }

  async createChat(req: Request, res: Response) {
    const participants: Types.ObjectId[] = req.body.participants;
    const name: string = req.body.name;
    let chatFound;

    if (name === null && participants.length === 2) {
      chatFound = await ChatService.findChat(participants);
    }
    if (chatFound) {
      res.json(chatFound._id);
    } else {
      let newChat;
      if (name) newChat = await ChatService.createGroup(participants, name);
      else newChat = await ChatService.createChat(participants);
      ProfileService.addChat(participants, newChat._id);
      res.json(newChat);
    }
  }
  async deleteChat(req: Request, res: Response) {
    await ChatService.deleteChat(req.params.id);
    res.status(200).json("Succes!");
  }
}

export default new ChatController();
