import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateBody =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorsPrettier = error.issues.map((item) => item.message);
        return res.status(400).json(errorsPrettier);
      }
      return res.status(500).json("Something went wrong");
    }
  };
