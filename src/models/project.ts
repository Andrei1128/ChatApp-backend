import { Types, Document, Schema, model } from "mongoose";

export interface Project extends Document {
  name: string;
  info: string;
  image: string;
  adminId: string;
  participants: Types.ObjectId[];
}

const project = model<Project>(
  "project",
  new Schema<Project>({
    name: { type: String, required: true },
    info: { type: String },
    image: { type: String },
    adminId: { type: String, required: true },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "profile",
        required: true,
      },
    ],
  })
);
export default project;
