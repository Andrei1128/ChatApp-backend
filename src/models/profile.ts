import { Types, Document, Schema, model } from "mongoose";

export interface Profile extends Document {
  name: string;
  image: string;
  about: string;
  friends: Types.ObjectId[];
  chats: Types.ObjectId[];
  requests: Types.ObjectId[];
}

const profile = model<Profile>(
  "profile",
  new Schema<Profile>({
    name: { type: String, required: true },
    image: { type: String },
    about: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "profile" }],
    chats: [{ type: Schema.Types.ObjectId, ref: "chat" }],
    requests: [{ type: Schema.Types.ObjectId, ref: "profile" }],
  })
);
export default profile;
