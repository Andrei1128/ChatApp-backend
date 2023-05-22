import { Types, model, Schema, Document } from "mongoose";
import { Message } from "./message";

export interface UserUtil {
  userId: string;
  deletedAt: Date;
  notifications: number;
}

export interface Chat extends Document {
  name: string;
  image: string;
  about: string;
  participants: Types.ObjectId[];
  messages: Types.ObjectId[] | Message[];
  userUtil: UserUtil[];
}

const chatModel = model<Chat>(
  "chat",
  new Schema<Chat>(
    {
      name: { type: String },
      image: { type: String },
      about: { type: String },
      participants: [
        {
          type: Schema.Types.ObjectId,
          ref: "profile",
          required: true,
        },
      ],
      messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
      userUtil: [
        {
          userId: { type: String, required: true },
          deletedAt: { type: Date, default: new Date() },
          notifications: { type: Number, default: 0 },
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
export default chatModel;
