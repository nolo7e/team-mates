import { Request, Response } from "express";
import { prisma } from "../../prismaClient";
import { userService } from "./user.service";

class UserController {
  async test(req: Request, res: Response) {
    res.status(200).send("Hello, server is alive");
  }

  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      //   await userService.checkUserExistence(body.email, body.username);
      const newUser = await userService.create(body);
      res.status(201).send(newUser);
      //хеширование пароля и проверка существования - в модуле авторизации
    } catch (error) {
      res.status(400).send("Такой пользователь есть или данные некорректны");
    }
  }

  async getAll(req: Request, res: Response) {
    //by filter
  }

  async getOne(req: Request, res: Response) {
    //
  }
}

export const userController = new UserController();
