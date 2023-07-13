import { Request, Response } from "express";
import { rolesService } from "./roles.service";
import { HttpError } from "../errors/HttpError";

/*========Roles here is a name of profession of user========*/

class RolesController {
  async createRole(req: Request, res: Response) {
    try {
      const newRole = await rolesService.create(req.body);
      res.status(201).send(newRole);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).send(error.message);
      }
      res.status(500).send("Внутренняя ошибка");
    }
  }

  async assignRole(req: Request, res: Response) {
    try {
      const updatedUser = await rolesService.assign(req.body);
      res.status(201).send(updatedUser);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).send(error.message);
      }
      res.status(500).send("Внутренняя ошибка");
    }
  }

  async getRoleById(req: Request, res: Response) {
    try {
      const roleId = Number(req.params.value);
      rolesService.checkIsIdNaN(req.params.value);
      const rolesList = await rolesService.getById(roleId);
      res.status(200).send(rolesList);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).send(error.message);
      }
      res.status(500).send("Внутренняя ошибка");
    }
  }

  async getAllRoles(req: Request, res: Response) {
    try {
      const rolesList = await rolesService.getAll();
      res.status(200).send(rolesList);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export const rolesController = new RolesController();
