import { Schema, model, Document, Types } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  profile: Types.ObjectId;
  validated: boolean;
}

const userModel = model<User>(
  "user",
  new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "profile",
      required: true,
      unique: true,
    },
    validated: { type: Boolean, default: false },
  })
);
export default userModel;
