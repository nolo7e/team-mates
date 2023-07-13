import { z } from "zod";

export const createProject = z
  .object({
    name: z
      .string({ required_error: "Имя проекта обязательно!" })
      .min(5, "Имя проекта не должно быть короче 5 символов")
      .max(64, "Имя проекта не должно быть длиннее 64 символов"),

    description: z.string({ required_error: "Добавьте описание к проекту!" }),

    deadline: z.string({ required_error: "Укажите дедлайн!" }).datetime(),

    roleNames: z.array(
      z.string({ required_error: "Укажите хотя бы одну роль!" })
    ),

    ownerRole: z.string(),

    tableNames: z.array(z.string()),

    taskTags: z.array(z.string()),

    userRoles: z.optional(
      z.array(
        z.object({ userId: z.number(), role: z.string(), isAdmin: z.boolean() })
      )
    ),

    avatar: z.optional(z.record(z.any())),
  })
  .strict({ message: "Вероятно, указаны дополнительные поля" });

export type createProjectDto = z.infer<typeof createProject>;

//роли - массив строк в таблице проекта
//UserProject - поле roles - строка
//добавить в userRoles поля isadmin
//owner будет прояверяться по токену
//проверять, есть ли пользователь с айди из userRoles и роль пользователя в массиве ролей
//если успешно, то создавать project, userproject, tables
