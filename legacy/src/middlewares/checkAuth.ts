import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { HttpError } from "../errors/HttpError";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET || "tokenSecretKey_hCM9Wz";
  try {
    const { accessToken, refreshToken } = req.cookies;
    console.log(req.cookies);

    jwt.verify(accessToken, TOKEN_SECRET, (err: VerifyErrors | null) => {
      console.log("access---------------->", err?.message);
      if (!err || (err && err instanceof TokenExpiredError)) return;
      else throw new HttpError(401, "Пользователь не авторизован!");
    });

    console.log("-----------------Валидируем рефреш------------------");

    jwt.verify(
      refreshToken,
      TOKEN_SECRET,
      (err: VerifyErrors | null, decode: string | JwtPayload | undefined) => {
        console.log("refresh---------------->", err);
        req.user = typeof decode === "object" ? decode?.data : decode;
        console.log(req.user);
        if (err) {
          throw new HttpError(401, "Пользователь не авторизован!");
        }
      }
    );

    console.log("------------------Валидация пройдена-----------------");

    return next();
  } catch (error) {
    if (error instanceof HttpError) {
      console.log("------------unauth----------");

      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Что-то не так с сервером");
    }
  }
};
