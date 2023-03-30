import { Document, Schema, model } from "mongoose";

export interface Token extends Document {
  content: string;
}

const token = model<Token>(
  "token",
  new Schema<Token>({
    content: { type: String, required: true, unique: true },
  })
);

export default token;
