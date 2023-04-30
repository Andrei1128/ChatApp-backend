import { Document, Schema, model } from "mongoose";
import { Profile } from "./profile";

export interface Message extends Document {
  content: string;
  timestamp: number;
  from: Profile;
}

const message = model<Message>(
  "message",
  new Schema<Message>({
    content: { type: String },
    from: {
      type: Schema.Types.ObjectId,
      ref: "profile",
    },
    timestamp: { type: Number, default: Date.now() },
  })
);
export default message;
