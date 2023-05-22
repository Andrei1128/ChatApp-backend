import { Types } from "mongoose";
import projectModel, { Project } from "../models/project";

class ChatService {
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
}

export default new ChatService();
