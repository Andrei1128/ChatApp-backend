import { Types } from "mongoose";
import { Request, Response } from "express";
import ProjectService from "../services/project";
import ProfileService from "../services/profile";
import ChatService from "../services/chat";
import shortid from "shortid";

class ProjectController {
  async createProject(req: Request, res: Response) {
    const participants: Types.ObjectId[] = req.body.participants;
    let flag = false;
    for (const participant of participants) {
      if (participant.toString() === req.myProfileID.toString()) flag = true;
    }
    if (!flag) {
      res.status(401).json("Profile is not in chat participants!");
      return;
    }
    const newProject = await ProjectService.createProject(
      participants,
      req.myProfileID.toString(),
      req.body.name,
      req.body.description
    );
    res.json(newProject);
    await ProfileService.addProject(participants, newProject._id);
  }

  async createCode(req: Request, res: Response) {
    const code = shortid.generate();
    await ProjectService.createCode(req.body.projId, code, req.myProfileID);
    res.json(code);
  }

  async joinProject(req: Request, res: Response) {
    const project = await ProjectService.joinProject(
      req.body.code,
      req.myProfileID
    );
    await ProfileService.joinProject(project?._id, req.myProfileID);
    res.json(project);
  }

  async addChat(req: Request, res: Response) {
    const chat = await ChatService.createProjChat(req.body.name);
    await ProjectService.addChat(chat._id, req.body.projId);
    res.json(chat);
  }
}

export default new ProjectController();
