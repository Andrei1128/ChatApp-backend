import { Types, model, Schema, Document } from "mongoose";

export interface Chat extends Document {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const chatModel = model<Chat>(
  "chat",
  new Schema<Chat>({
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "profile",
        required: true,
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
  })
);
export default chatModel;
