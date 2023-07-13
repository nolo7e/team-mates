import { User } from "@prisma/client";
import { UserTokenInfo } from "../../src/const/user-token-info";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserTokenInfo;
    decoded?: jwt.JwtPayload;
  }
}
