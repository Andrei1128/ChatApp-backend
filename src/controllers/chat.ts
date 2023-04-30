import { Types } from "mongoose";
import ChatService from "../services/chat";
import ProfileService from "../services/profile";
import { Request, Response } from "express";
import io from "../../index";
import MessageService from "../services/message";
import { Message } from "../models/message";

class ChatController {
  async updateImage(req: Request, res: Response) {
    const chatId = req.body.id;
    const chatImage = req.body.image;
    await ChatService.verifyIfProfileIsInChat(chatId, req.myProfileID);
    const chat = await ChatService.findAndUpdateImage(chatId, chatImage);
    const messageContent = `Group image updated`;
    for (const participant of chat.participants) {
      io.to(participant.toString()).emit("new chat image", {
        id: chatId,
        image: chatImage,
      });
    }
    res.status(200).json("Succes!");

    const newMessage = await MessageService.createMessage(messageContent);
    await ChatService.AddMessage(chat._id, newMessage._id);
  }
  async updateName(req: Request, res: Response) {
    const chatId = req.body.id;
    const chatName = req.body.name;
    await ChatService.verifyIfProfileIsInChat(chatId, req.myProfileID);
    const chat = await ChatService.findAndUpdateName(chatId, chatName);
    const messageContent = `Group name changed to '${chatName}'`;
    for (const participant of chat.participants) {
      io.to(participant.toString()).emit("new chat name", {
        id: chatId,
        name: chatName,
      });
    }
    res.status(200).json("Succes!");
    const newMessage = await MessageService.createMessage(messageContent);
    await ChatService.AddMessage(chat._id, newMessage._id);
  }
  async updateAbout(req: Request, res: Response) {
    const chatId = req.body.id;
    const chatAbout = req.body.about;
    await ChatService.verifyIfProfileIsInChat(chatId, req.myProfileID);
    const chat = await ChatService.findAndUpdateAbout(chatId, chatAbout);
    const messageContent = `Group info updated`;
    for (const participant of chat.participants) {
      io.to(participant.toString()).emit("new chat about", {
        id: chatId,
        about: chatAbout,
      });
    }
    res.status(200).json("Succes!");
    const newMessage = await MessageService.createMessage(messageContent);
    await ChatService.AddMessage(chat._id, newMessage._id);
  }
  async createChat(req: Request, res: Response) {
    const participants: Types.ObjectId[] = req.body.participants;
    let flag = false;
    for (const participant of participants) {
      if (participant.toString() === req.myProfileID.toString()) flag = true;
    }
    if (!flag) {
      res.status(401).json("Profile is not in chat participants!");
      return;
    }
    const name: string = req.body.name;
    let chatFound;
    if (name === null && participants.length === 2)
      chatFound = await ChatService.findChat(participants);
    if (chatFound) {
      res.json(chatFound._id);
    } else {
      let newChat;
      if (name) {
        newChat = await ChatService.createGroup(participants, name);
      } else newChat = await ChatService.createChat(participants);
      ProfileService.addChat(participants, newChat._id);
      let messageContent;
      let newMessage;
      if (name) {
        messageContent = `New group created`;
        newMessage = await MessageService.createMessage(messageContent);
        await ChatService.AddMessage(newChat._id, newMessage._id);
      } else {
        messageContent = "Hey! 👋";
        newMessage = await MessageService.createMessage(
          messageContent,
          req.myProfileID
        );
        await ChatService.AddMessage(newChat._id, newMessage._id);
      }
      (newChat.messages as Message[]).push(newMessage);
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
