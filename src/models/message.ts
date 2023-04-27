import { Types, Document, Schema, model } from "mongoose";

export interface Message extends Document {
  content: string;
  from: Types.ObjectId;
  timestamp: number;
}

const message = model<Message>(
  "message",
  new Schema<Message>({
    content: { type: String },
    from: {
      type: Schema.Types.ObjectId,
      ref: "profile",
      required: true,
    },
    timestamp: { type: Number },
  })
);
export default message;
