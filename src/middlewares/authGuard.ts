import jwt from "jsonwebtoken";
import TokenService from "../services/token";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const headerAuth = req.headers.authorization;
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    const tokenFound = await TokenService.findToken(token);
    if (tokenFound) {
      try {
        const decoded = jwt.verify(
          tokenFound.content,
          process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;
        req.myProfileID = new Types.ObjectId(decoded.myProfileID);
        next();
      } catch (e) {
        await TokenService.deleteToken(tokenFound._id);
        res.status(401).json("Session expired!");
      }
    } else res.status(401).json("Token not found!");
  } else res.status(401).json("Token not provided!");
};

export default authGuard;
