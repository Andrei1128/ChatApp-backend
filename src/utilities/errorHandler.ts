/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

export default function handleError(_function: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await _function(req, res, next);
    } catch (err) {
      console.log(err);
      return res.status(400).json((err as Error).message);
    }
  };
}
