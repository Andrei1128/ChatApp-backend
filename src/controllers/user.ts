import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import TokenService from "../services/token";
import ProfileService from "../services/profile";
import UserService from "../services/user";
import { Request, Response } from "express";
import sendEmail from "../utilities/mailSender";
import { Types } from "mongoose";

class UserController {
  async login(req: Request, res: Response) {
    const userFound = await UserService.findUserByEmail(req.body.email);
    if (userFound != null) {
      if (userFound.validated) {
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
        } else res.status(400).json("Wrong password!");
      } else res.status(400).json("User is not validated!");
    } else res.status(400).json("Invalid email!");
  }
  async verify(req: Request, res: Response) {
    const token = req.params.token;
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;
      await UserService.verify(decoded.userId as Types.ObjectId);
      res.redirect("http://localhost:4200");
    } catch (e) {
      res.status(401).json("Invalid token!");
    }
  }

  async register(req: Request, res: Response) {
    if (!(await UserService.findUserByEmail(req.body.email))) {
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

      const verificationToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET as string
      );

      const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;
      const emailSubject = "Account Verification";
      const emailText = `Click on the following link to verify your account: ${verificationLink}`;

      try {
        await sendEmail(req.body.email, emailSubject, emailText);
        res.json(
          "Registration successful. Please check your email for verification."
        );
      } catch (error) {
        res.status(500).json("Error sending verification email.");
      }
    } else {
      res.status(400).json("Email already used!");
    }
  }

  async logout(req: Request, res: Response) {
    const headerAuth = req.headers.authorization;
    const token = headerAuth && headerAuth.split(" ")[1];
    if (token) {
      const tokenFound = await TokenService.findToken(token);
      await TokenService.deleteToken(tokenFound._id);
      res.status(200).json("Succes!");
    } else res.status(400).json("Something went wrong!");
  }
}
export default new UserController();
