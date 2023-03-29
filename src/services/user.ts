import { User } from "../interfaces/user";
import userModel from "../models/user";

async function createUser(newUser: User) {
  return await userModel.create(newUser);
}
async function findUserByEmail(email: string) {
  return await userModel.findOne({ email }).populate("profile");
}
async function findUserByName(nickname: string) {
  return await userModel.findOne({ nickname }).populate("profile");
}

export { findUserByEmail, findUserByName, createUser };
