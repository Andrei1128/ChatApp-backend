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
        ref: "Profile",
        required: true,
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  })
);
export default chatModel;
