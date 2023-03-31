import ChatService from "../services/chat";
import ProfileService from "../services/profile";
import { Request, Response } from "express";

class ChatController {
  async findChat(req: Request, res: Response) {
    const chatFound = await ChatService.getPopulatedChat(req.params.id);
    res.json(chatFound?.messages);
  }

  async createChat(req: Request, res: Response) {
    const participants = req.body.participants;
    const newChat = await ChatService.createChat(participants);
    ProfileService.addChat(participants, newChat._id);
    res.json(newChat);
  }
}

export default new ChatController();
