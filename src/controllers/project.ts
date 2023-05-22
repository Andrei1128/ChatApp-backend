import { Types } from "mongoose";
import { Request, Response } from "express";
import ProjectService from "../services/project";
import ProfileService from "../services/profile";

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
}

export default new ProjectController();
