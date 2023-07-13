import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const setTokenInCookie = async (req: Request, res: Response) => {
  console.log(req.user);
  const TOKEN_SECRET = process.env.TOKEN_SECRET || "tokenSecretKey_hCM9Wz";
  //set cookie here
  const accessToken = jwt.sign({ data: req.user }, TOKEN_SECRET, {
    expiresIn: 60 * 5,
  });
  const refreshToken = jwt.sign({ data: req.user }, TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  const cookieExpirationDate = 1000 * 60 * 60 * 24 * 30; //30 days expiration time

  res.cookie("acessToken", accessToken, { maxAge: cookieExpirationDate });
  res.cookie("refreshToken", refreshToken, { maxAge: cookieExpirationDate });
  res.status(200).send(req.user);
};
