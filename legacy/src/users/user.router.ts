import express, { Router } from "express";
import { userController } from "./user.controller";
import { createUser } from "./dto/create-user.dto";
import { validateBody } from "../middlewares/validateBody";

const userRouter = express.Router();

userRouter.post("/new", validateBody(createUser), userController.create);
userRouter.get("/all");
userRouter.get("/", userController.test);

export default userRouter;
