import tokenModel from "../models/token";

async function createToken(token: string) {
  await tokenModel.create({ content: token });
}
async function deleteToken(token: string) {
  await tokenModel.findOneAndDelete({ content: token });
}
async function findToken(token: string) {
  return await tokenModel.findOne({ content: token });
}
export { createToken, deleteToken, findToken };
