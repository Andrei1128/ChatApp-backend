import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import TokenService from "../services/token";
import ProfileService from "../services/profile";
import UserService from "../services/user";
import { Request, Response } from "express";

class UserController {
  async login(req: Request, res: Response) {
    const userFound = await UserService.findUserByEmail(req.body.email);
    if (userFound != null) {
      if (bcrypt.compareSync(req.body.password, userFound.password)) {
        const token = jwt.sign(
          { myProfileID: userFound.profile._id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );
        await TokenService.createToken(token);
        res.json(token);
      } else res.sendStatus(400);
    } else res.sendStatus(400);
  }

  async register(req: Request, res: Response) {
    if (
      (await UserService.findUserByEmail(req.body.email)) == null &&
      (await UserService.findUserByName(req.body.name)) == null
    ) {
      const salt = bcrypt.genSaltSync(
        parseInt(process.env.SALT_ROUND as string)
      );
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newProfile = await ProfileService.createProfile(req.body.name);
      const newUser = await UserService.createUser({
        ...req.body,
        password: hash,
        profile: newProfile,
      });
      const token = jwt.sign(
        { myProfileID: newUser.profile._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      await TokenService.createToken(token);
      res.json(token);
    } else {
      res.sendStatus(400);
    }
  }

  async logout(req: Request, res: Response) {
    const headerAuth = req.headers.authorization;
    const token = headerAuth && headerAuth.split(" ")[1];
    if (token) {
      const tokenFound = await TokenService.findToken(token);
      await TokenService.deleteToken(tokenFound._id);
      res.sendStatus(200);
    } else res.sendStatus(400);
  }
}
export default new UserController();
