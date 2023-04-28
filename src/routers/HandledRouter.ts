/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { CatchAll } from "../middlewares/errorHandler";

class HandledRouter {
  private _router;

  constructor() {
    this._router = express.Router();
  }

  public get(route: string, ...functions: any[]): void {
    this._router.get(route, ...functions.map((f) => CatchAll(f)));
  }

  public post(route: string, ...functions: any[]): void {
    this._router.post(route, ...functions.map((f) => CatchAll(f)));
  }

  public put(route: string, ...functions: any[]): void {
    this._router.put(route, ...functions.map((f) => CatchAll(f)));
  }

  public delete(route: string, ...functions: any[]): void {
    this._router.delete(route, ...functions.map((f) => CatchAll(f)));
  }

  public patch(route: string, ...functions: any[]): void {
    this._router.patch(route, ...functions.map((f) => CatchAll(f)));
  }

  public getRouter(): express.Router {
    return this._router;
  }
}

export default new HandledRouter();
