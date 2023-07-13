import { prisma } from "../../prismaClient";
import { HttpError } from "../errors/HttpError";
import { userService } from "../users/user.service";
import { assignRoleDto } from "./dto/assign-role.dto";
import { createRoleDto } from "./dto/create-role.dto";

class RolesService {
  async create(data: createRoleDto) {
    await this.checkRoleExistence(data.name);
    const newRole = await prisma.role.create({ data });
    return newRole;
  }

  async assign(data: assignRoleDto) {
    const user = await userService.getUserByUsername(data.username);
    const role = await this.getById(data.roleId);
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { roleId: role.id },
    });
    return updatedUser;
  }

  async getAll() {
    const rolesList = await prisma.role.findMany();
    return rolesList;
  }

  async getById(id: number) {
    const role = await prisma.role.findUnique({ where: { id } });
    if (!role) {
      throw new HttpError(404, "Профессия не найдена!");
    }
    return role;
  }

  async getByName(name: string) {
    const role = await prisma.role.findUnique({ where: { name } });
    if (!role) {
      throw new HttpError(404, "Профессия не найдена!");
    }
    return role;
  }

  async checkRoleExistence(name: string) {
    const roleCandidate = await prisma.role.findUnique({
      where: { name },
    });
    if (roleCandidate) {
      throw new HttpError(400, `Пользователь с именем ${name} не найден!`);
    }
  }

  checkIsIdNaN(id: string) {
    if (isNaN(Number(id))) throw new HttpError(404, "В запросе ошибка");
  }
}

export const rolesService = new RolesService();
