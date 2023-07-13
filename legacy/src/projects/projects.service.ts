import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../prismaClient";
import { fileService } from "../files/files.service";
import { createProjectDto } from "./dto/create-project.dto";
import { UserTokenInfo } from "../const/user-token-info";
import { HttpError } from "../errors/HttpError";

interface UserProjectRole {
  userId: number;
  userProjectRole: string;
  isAdmin: boolean;
  isOwner: boolean;
}

class ProjectService {
  async checkUsersExistence(userRoles: IUserRoles[]): Promise<void | never> {
    const users = userRoles.map((userRole) => userRole.userId);
    const usersInDB = await prisma.user.findMany({
      where: { id: { in: users } },
      select: { id: true },
    });

    if (users.length !== usersInDB.length) {
      throw new HttpError(404, "Пользователи не найдены");
    } else return;
  }

  validateRoles(
    userRoles: IUserRoles[],
    rolesArray: string[],
    ownerRole: string
  ): void | never {
    console.log("------", userRoles, "--------", rolesArray, "----", ownerRole);
    const isAdminRoleValid = rolesArray.some((role) => role === ownerRole);
    if (!isAdminRoleValid) {
      throw new HttpError(400, `Вы не указали роль ${ownerRole}`);
    }
    for (const userRole of userRoles) {
      if (!rolesArray.includes(userRole.role)) {
        throw new HttpError(400, `Вы не указали роль ${userRole.role}`);
      }
    }
    return;
  }

  prepareDataForDB(dto: createProjectDto, owner: UserTokenInfo) {
    const avatarUrl = dto.avatar
      ? fileService.createFileImage(dto.avatar)
      : null;
    const { name, description, deadline, roleNames } = dto;

    const usersInProject: UserProjectRole[] = dto.userRoles?.length
      ? dto.userRoles.map((userRole) => {
          const { userId, role, isAdmin } = userRole;
          return {
            userId,
            isAdmin,
            isOwner: false,
            userProjectRole: role,
          };
        })
      : [];
    usersInProject.push({
      userId: owner.id,
      isAdmin: true,
      isOwner: true,
      userProjectRole: dto.ownerRole,
    });

    const tables = dto.tableNames.map((table) => {
      return { name: table };
    });

    return {
      project: { name, description, deadline, avatarUrl, roles: roleNames },
      tablesInProject: tables,
      usersInProject: usersInProject,
    };
  }

  async createProject(dto: createProjectDto, owner: UserTokenInfo) {
    if (dto.userRoles?.length) {
      this.validateRoles(dto.userRoles, dto.roleNames, dto.ownerRole);
      await this.checkUsersExistence(dto.userRoles);
    }

    const projectData = this.prepareDataForDB(dto, owner);
    const project = await prisma.project.create({
      data: {
        ...projectData.project,
        usersInProject: { createMany: { data: projectData.usersInProject } },
        tablesInProject: {
          createMany: { data: projectData.tablesInProject },
        },
      },
    });

    return project;
  }

  async updateAllProject() {
    //получаем опциональные поля для апдейта (имя, описание, роли)
    //удалять роли нельзя, можно только переименовывать select from projectRoles where role update many
    //о таблицах и их порядке - на фронт прилетают айди таблиц, и по ним же ведется поиск для апдейта
    //select table where id = request.id update request info
  }

  async addTable() {
    //
  }

  async addUserToProject() {
    //
  }
}

type IUserRoles = {
  userId: number;
  role: string;
  isAdmin: boolean;
};

export const projectService = new ProjectService();
