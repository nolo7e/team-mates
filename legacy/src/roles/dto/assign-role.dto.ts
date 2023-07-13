import { z } from "zod";

/*========Roles here is a name of profession of user========*/

export const assignRole = z
  .object({
    username: z
      .string({ required_error: "Обязательно для заполнения" })
      .min(3, "Минимальная длина 3 символа")
      .max(64, "Максимум 64 символа"),
    roleId: z.number({ required_error: "Обязательно для заполнения" }),
  })
  .strict({ message: "Вероятно, указаны дополнительные поля" });

export type assignRoleDto = z.infer<typeof assignRole>;
