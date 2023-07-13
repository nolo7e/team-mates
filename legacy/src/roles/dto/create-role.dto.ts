import { z } from "zod";

/*========Roles here is a name of profession of user========*/

export const createRole = z
  .object({
    name: z
      .string({ required_error: "Имя прфоессии обязательно для заполнения" })
      .min(3, "Минимальная длина 3 символа")
      .max(64, "Максимум 64 символа"),
  })
  .strict({ message: "Вероятно, указаны дополнительные поля" });

export type createRoleDto = z.infer<typeof createRole>;
