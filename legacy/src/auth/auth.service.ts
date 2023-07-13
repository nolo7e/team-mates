import { HttpError } from "../errors/HttpError";
import { createUserDto } from "../users/dto/create-user.dto";
import { signInUserDto } from "../users/dto/sign-in-user.dto";
import { userService } from "../users/user.service";
import * as bcrypt from "bcryptjs";

export class AuthService {
  async signIn(dto: signInUserDto) {
    const user = await userService.getUserByEmail(dto.email);
    const isPasswordCorrect = await bcrypt.compare(
      dto.password,
      user?.password || ""
    );
    if (user && isPasswordCorrect) {
      const { id, email, roleId } = user;
      return { id, email, roleId };
    } else {
      throw new HttpError(404, "Пользователь не найден");
    }
  }

  async signUp(dto: createUserDto) {
    const users = await userService.findByUniqueFields(dto.email, dto.username);
    if (!!users.length) {
      throw new HttpError(
        400,
        `Пользователя с данными ${dto.username} / ${dto.email} нет`
      );
    }
    const passwordHash = await bcrypt.hash(dto.password, 5);
    const newUser = await userService.create({
      ...dto,
      password: passwordHash,
    });
    const { id, email, roleId } = newUser;
    return { id, email, roleId };
  }
}

export const authService = new AuthService();
