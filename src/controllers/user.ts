import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createToken, deleteToken } from "../services/token";
import { createProfile } from "../services/profile";
import { findUserByEmail, findUserByName, createUser } from "../services/user";
import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  const userFound = await findUserByEmail(req.body.email);
  if (userFound != null) {
    if (bcrypt.compareSync(req.body.password, userFound.password)) {
      const token = jwt.sign(
        { profileId: userFound.profile._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      await createToken(token);
      res.json(token);
    } else return res.sendStatus(400);
  } else return res.sendStatus(400);
};

const register = async (req: Request, res: Response) => {
  if (
    (await findUserByEmail(req.body.email)) == null &&
    (await findUserByName(req.body.nickname)) == null
  ) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND as string));
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newProfile = await createProfile(req.body.nickname);
    const newUser = await createUser({
      ...req.body,
      password: hash,
      profile: newProfile,
    });
    const token = jwt.sign(
      { profileId: newUser.profile._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    await createToken(token);
    res.json(token);
  } else return res.sendStatus(400);
};

const logout = async (req: Request, res: Response) => {
  const headerAuth = req.headers.authorization;
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    await deleteToken(token);
    res.sendStatus(200);
  } else return res.sendStatus(400);
};

export { login, register, logout };
