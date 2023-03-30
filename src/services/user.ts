import userModel, { User } from "../models/user";

class UserService {
  async createUser(newUser: User): Promise<any> {
    return await userModel.create(newUser);
  }
  async findUserByEmail(email: string): Promise<any> {
    return await userModel.findOne({ email }).populate("profile");
  }
  async findUserByName(name: string): Promise<any> {
    return await userModel.findOne({ name }).populate("profile");
  }
}

export default new UserService();
