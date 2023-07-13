import { Request, Response } from "express";
import { createProjectDto } from "./dto/create-project.dto";
import { projectService } from "./projects.service";
import { HttpError } from "../errors/HttpError";

class ProjectsController {
  async createProject(req: Request, res: Response) {
    try {
      if (req.user) {
        const project = await projectService.createProject(req.body, req.user);

        res.status(201).send(project);
      } else {
        throw new HttpError(401, "Пользователь не авторизован!");
      }
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).send(error.message);
      }
    }
  }
}

export const projectsController = new ProjectsController();
