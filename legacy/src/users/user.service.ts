import { prisma } from "../../prismaClient";
import { HttpError } from "../errors/HttpError";
import { rolesService } from "../roles/roles.service";
import { createUserDto } from "./dto/create-user.dto";

class UserService {
  async getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new HttpError(404, `Пользователь ${username} не найден!`);
    }
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
  async findByUniqueFields(email: string, username: string) {
    const users = await prisma.user.findMany({
      where: { OR: [{ email }, { username }] },
    });
    return users;
  }

  async create(data: createUserDto) {
    const role = await rolesService.getById(data.roleId);
    const newUser = await prisma.user.create({ data });
    return newUser;
    //хеширование пароля - в модуле авторизации
  }
}
export const userService = new UserService();
