import express from "express";
import userRouter from "./src/users/user.router";
import rolesRouter from "./src/roles/roles.router";
import authRouter from "./src/auth/auth.router";
import projectsRouter from "./src/projects/projects.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/roles", rolesRouter);
router.use("/auth", authRouter);
router.use("/projects", projectsRouter);

export default router;
