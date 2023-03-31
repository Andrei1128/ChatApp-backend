import userModel, { User } from "../models/user";

class UserService {
  async createUser(newUser: User): Promise<User> {
    return await userModel.create(newUser);
  }
  async findUserByEmail(email: string): Promise<User> {
    const userFound = await userModel.findOne({ email }).populate("profile");
    if (userFound) return userFound;
    else throw new Error("User not found!");
  }
  async findUserByName(name: string): Promise<User> {
    const userFound = await userModel.findOne({ name }).populate("profile");
    if (userFound) return userFound;
    else throw new Error("User not found!");
  }
}

export default new UserService();
