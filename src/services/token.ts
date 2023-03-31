import tokenModel, { Token } from "../models/token";
import { Types } from "mongoose";

class TokenService {
  async createToken(token: string): Promise<void> {
    await tokenModel.create({ content: token });
  }
  async deleteToken(id: Types.ObjectId): Promise<void> {
    await tokenModel.findByIdAndDelete(id);
  }
  async findToken(token: string): Promise<Token> {
    const tokenFound = await tokenModel.findOne({ content: token });
    if (tokenFound) return tokenFound;
    else throw new Error("Token not found!");
  }
}
export default new TokenService();
