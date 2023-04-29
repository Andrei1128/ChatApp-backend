/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import handleError from "./errorHandler";

class HandledRouter {
  private router;

  constructor() {
    this.router = express.Router();
  }

  public get(route: string, ...controller: any[]) {
    this.router.get(
      route,
      ...controller.map((_function) => handleError(_function))
    );
  }

  public post(route: string, ...controller: any[]) {
    this.router.post(
      route,
      ...controller.map((_function) => handleError(_function))
    );
  }

  public put(route: string, ...controller: any[]) {
    this.router.put(
      route,
      ...controller.map((_function) => handleError(_function))
    );
  }

  public delete(route: string, ...controller: any[]) {
    this.router.delete(
      route,
      ...controller.map((_function) => handleError(_function))
    );
  }

  public patch(route: string, ...controller: any[]) {
    this.router.patch(
      route,
      ...controller.map((_function) => handleError(_function))
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default HandledRouter;
