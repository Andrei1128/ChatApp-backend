import { Types, Document, Schema, model } from "mongoose";

export interface Poll extends Document {
  name: string;
  fields: Field[];
}

export const pollModel = model<Poll>(
  "poll",
  new Schema<Poll>({
    name: { type: String, required: true },
    fields: [
      {
        name: { type: String },
        votes: [{ type: Schema.Types.ObjectId, ref: "profile" }],
      },
    ],
  })
);

export interface Field {
  name: string;
  votes: Types.ObjectId[];
}

export interface Project extends Document {
  name: string;
  info: string;
  image: string;
  adminId: string;
  participants: Types.ObjectId[];
  chats: Types.ObjectId[];
  polls: Poll[];
}

const project = model<Project>(
  "project",
  new Schema<Project>({
    name: { type: String, required: true },
    info: { type: String },
    image: { type: String },
    adminId: { type: String, required: true },
    chats: [{ type: Schema.Types.ObjectId, ref: "chat" }],
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "profile",
        required: true,
      },
    ],
    polls: [{ type: Schema.Types.ObjectId, ref: "poll" }],
  })
);
export default project;
