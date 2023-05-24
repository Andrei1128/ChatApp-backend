import { Document, Schema, Types, model } from "mongoose";

export interface ProjectCode extends Document {
  code: string;
  projId: Types.ObjectId;
  createdAt: number;
}

const projectCode = model<ProjectCode>(
  "projectCode",
  new Schema<ProjectCode>({
    code: { type: String, unique: true },
    projId: { type: Schema.Types.ObjectId, ref: "project" },
    createdAt: { type: Number, default: Date.now() },
  })
);

export default projectCode;
