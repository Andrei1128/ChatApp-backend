import { Types } from "mongoose";
import ChatService from "../services/chat";
import ProfileService from "../services/profile";
import { Request, Response } from "express";

class ChatController {
  async findChat(req: Request, res: Response) {
    const chatFound = await ChatService.getPopulatedChat(req.params.id);
    res.json(chatFound?.messages);
  }

  async createChat(req: Request, res: Response) {
    const participants: Types.ObjectId[] = req.body.participants;
    let chatFound;
    if (participants.length === 2) {
      chatFound = await ChatService.findChat(participants);
    }
    if (chatFound) {
      res.json(chatFound._id);
    } else {
      const newChat = await ChatService.createChat(participants);
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
