import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { HttpError } from "../errors/HttpError";

export class AuthConroller {
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.signIn(req.body);
      req.user = user;
      return next();
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).send(error.message);
      }
      res.status(500).send("Внутренняя ошибка");
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.signUp(req.body);
      req.user = user;
      return next();
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).send(error.message);
      }
      res.status(500).send("Внутренняя ошибка");
    }
  }
}

export const authController = new AuthConroller();
