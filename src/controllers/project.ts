import { Types } from "mongoose";
import { Request, Response } from "express";
import ProjectService from "../services/project";
import ProfileService from "../services/profile";
import ChatService from "../services/chat";
import shortid from "shortid";
import { pollModel } from "../models/project";

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
  async addPoll(req: Request, res: Response) {
    const poll = await ProjectService.createPoll(
      req.body.name,
      req.body.fields
    );
    await ProjectService.addPoll(poll._id, req.body.projId);
    res.json(poll);
  }

  async vote(req: Request, res: Response) {
    const pollFound = await pollModel.findById(req.body.pollId);
    let alreadyVoted = false;
    if (pollFound) {
      const myId = req.myProfileID.toString();
      for (const field of pollFound.fields) {
        field.votes.forEach((v) => {
          if (v.toString() === myId) {
            alreadyVoted = true;
          }
        });
      }
      if (!alreadyVoted) {
        pollFound.fields = pollFound.fields.map((f) => {
          if (f.name === req.body.field) f.votes.push(req.myProfileID);
          return f;
        });
        await pollModel.updateOne({ _id: pollFound._id }, pollFound);
        res.status(200).json("Success");
      } else res.status(402).json("You already voted!");
    } else {
      res.status(400).json("Poll not found!");
    }
  }
}

export default new ProjectController();
