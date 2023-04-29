import { Types } from "mongoose";
import ChatService from "../services/chat";
import ProfileService from "../services/profile";
import { Request, Response } from "express";
import io from "../../index";

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
    const chatId = req.body.id;
    const chatImage = req.body.image;
    const participants = await ChatService.findAndUpdateImage(
      chatId,
      chatImage
    );

    for (const participant of participants) {
      if (participant.toString() !== req.myProfileID.toString())
        io.to(participant.toString()).emit("new chat image", {
          id: chatId,
          image: chatImage,
        });
    }
    res.status(200).json("Succes!");
  }
  async updateName(req: Request, res: Response) {
    const chatId = req.body.id;
    const chatName = req.body.name;
    const participants = await ChatService.findAndUpdateName(chatId, chatName);
    for (const participant of participants) {
      if (participant.toString() !== req.myProfileID.toString()) {
        io.to(participant.toString()).emit("new chat name", {
          id: chatId,
          name: chatName,
        });
      }
    }
    res.status(200).json("Succes!");
  }
  async updateAbout(req: Request, res: Response) {
    const chatId = req.body.id;
    const chatAbout = req.body.about;
    const participants = await ChatService.findAndUpdateAbout(
      chatId,
      chatAbout
    );
    for (const participant of participants) {
      if (participant.toString() !== req.myProfileID.toString()) {
        io.to(participant.toString()).emit("new chat about", {
          id: chatId,
          about: chatAbout,
        });
      }
    }
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
      for (const participant of participants) {
        if (participant.toString() !== req.myProfileID.toString())
          io.to(participant.toString()).emit("new chat", newChat);
      }
      res.json(newChat);
    }
  }
  async deleteChat(req: Request, res: Response) {
    await ChatService.deleteChat(req.params.id);
    res.status(200).json("Succes!");
  }
}

export default new ChatController();
