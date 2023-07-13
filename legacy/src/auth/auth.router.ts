import express, { Router } from "express";
import { validateBody } from "../middlewares/validateBody";
import { authController } from "./auth.controller";
import { createUser } from "../users/dto/create-user.dto";
import { setTokenInCookie } from "../middlewares/setToken";
import { signInUser } from "../users/dto/sign-in-user.dto";

const authRouter = express.Router();

authRouter.post(
  "/signin",
  validateBody(signInUser),
  authController.signIn,
  setTokenInCookie
);
authRouter.post(
  "/signup",
  validateBody(createUser),
  authController.signUp,
  setTokenInCookie
);

export default authRouter;
