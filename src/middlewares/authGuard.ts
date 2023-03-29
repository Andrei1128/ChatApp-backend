import jwt from "jsonwebtoken";
import { findToken, deleteToken } from "../services/token";
import { Request, Response, NextFunction } from "express";

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const headerAuth = req.headers.authorization;
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    const tokenFound = await findToken(token);
    if (tokenFound != null) {
      try {
        const decoded = jwt.verify(
          tokenFound.content,
          process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;
        req.headers.myProfileId = decoded.profileId;
        console.log(req.headers.myProfileId);
        next();
      } catch (e) {
        await deleteToken(tokenFound.content);
        return res.sendStatus(400);
      }
    } else return res.sendStatus(400);
  } else return res.sendStatus(400);
};

export default authGuard;
