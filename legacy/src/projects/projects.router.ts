import express from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { projectsController } from "./projects.controller";
import { validateBody } from "../middlewares/validateBody";
import { createProject } from "./dto/create-project.dto";

const projectsRouter = express.Router();

projectsRouter.post(
  "/new",
  checkAuth,
  validateBody(createProject),
  projectsController.createProject
);
projectsRouter.put("/update");
projectsRouter.delete("/delete");
projectsRouter.get("/:project");
projectsRouter.get("/workspace/:project");

export default projectsRouter;
