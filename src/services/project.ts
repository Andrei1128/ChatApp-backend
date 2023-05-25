import { Types } from "mongoose";
import projectModel, {
  Field,
  Poll,
  Project,
  pollModel,
} from "../models/project";
import projectCode from "../models/projectCode";

class ProjectService {
  async createProject(
    participants: Types.ObjectId[],
    adminId: string,
    name: string,
    description: string
  ): Promise<Project> {
    const newProject = (
      await projectModel.create({ participants, adminId, name, description })
    ).populate("participants");
    return newProject;
  }
  async createCode(
    projId: Types.ObjectId,
    code: string,
    myId: Types.ObjectId
  ): Promise<void> {
    const projectFound = await projectModel.findById(projId);
    if (projectFound) {
      if (projectFound.adminId === myId.toString()) {
        await projectCode.create({ code, projId });
      } else throw new Error("You are not the admin of the project!");
    } else throw new Error("Project not found!");
  }

  async joinProject(
    code: string,
    myId: Types.ObjectId
  ): Promise<Project | undefined> {
    const codeFound = await projectCode
      .findOne({ code: code })
      .populate("projId");
    if (codeFound) {
      const day = 86400000;
      if (codeFound.createdAt - Date.now() < day) {
        const project = await projectModel.findByIdAndUpdate(codeFound.projId, {
          $push: { participants: myId },
        });
        if (project) return project;
        else return undefined;
      } else throw new Error("Code is expired!");
    } else throw new Error("Invalid code!");
  }

  async addChat(chat: Types.ObjectId, projId: Types.ObjectId): Promise<void> {
    await projectModel.findByIdAndUpdate(projId, {
      $push: { chats: chat },
    });
  }
  async addPoll(poll: Types.ObjectId, projId: Types.ObjectId): Promise<void> {
    await projectModel.findByIdAndUpdate(projId, {
      $push: { polls: poll },
    });
  }

  async createPoll(name: string, fields: string[]): Promise<Poll> {
    const _fields: Field[] = [];
    for (const field of fields) {
      _fields.push({ name: field, votes: [] });
    }
    const pollCreated = await pollModel.create({ name: name, fields: _fields });
    return pollCreated;
  }
}

export default new ProjectService();
