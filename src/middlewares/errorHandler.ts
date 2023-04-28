/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

export function CatchAll(f: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await f(req, res, next);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: e,
      });
    }
  };
}
