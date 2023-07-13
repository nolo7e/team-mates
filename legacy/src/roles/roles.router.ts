import express, { Router } from "express";
import { validateBody } from "../middlewares/validateBody";
import { createRole } from "./dto/create-role.dto";
import { rolesController } from "./roles.controller";
import { assignRole } from "./dto/assign-role.dto";

/*========Roles here is a name of profession of user========*/

const rolesRouter = express.Router();

rolesRouter.post("/new", validateBody(createRole), rolesController.createRole);
rolesRouter.put(
  "/assign",
  validateBody(assignRole),
  rolesController.assignRole
);
rolesRouter.get("/all", rolesController.getAllRoles);
rolesRouter.get("/:value", rolesController.getRoleById);

export default rolesRouter;
