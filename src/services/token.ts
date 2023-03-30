import tokenModel from "../models/token";

class TokenService {
  async createToken(token: string): Promise<any> {
    await tokenModel.create({ content: token });
  }
  async deleteToken(token: string): Promise<any> {
    await tokenModel.findOneAndDelete({ content: token });
  }
  async findToken(token: string): Promise<any> {
    return await tokenModel.findOne({ content: token });
  }
}
export default new TokenService();
