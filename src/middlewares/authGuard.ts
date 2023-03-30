import jwt from "jsonwebtoken";
import TokenService from "../services/token";
import { Request, Response, NextFunction } from "express";

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const headerAuth = req.headers.authorization;
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    const tokenFound = await TokenService.findToken(token);
    if (tokenFound != null) {
      try {
        const decoded = jwt.verify(
          tokenFound.content,
          process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;
        req.headers.myProfileId = decoded.profileId;
        next();
      } catch (e) {
        await TokenService.deleteToken(tokenFound.content);
        return res.sendStatus(400);
      }
    } else return res.sendStatus(400);
  } else return res.sendStatus(400);
};

export default authGuard;
