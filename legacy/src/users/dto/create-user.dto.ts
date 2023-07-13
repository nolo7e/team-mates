import { z } from "zod";

export const createUser = z
  .object({
    email: z
      .string({ required_error: "Почта обязательна!" })
      .email({ message: "Введите, пожалуйста, настоящий адрес почты" })
      .min(5, "Минимальная длина почты 5 символов")
      .max(64, "Максимальная длина почты 64 символа"),

    username: z
      .string({
        required_error: "Имя пользователя обязательно для заполнения!",
      })
      .min(5, "Минимальная длина имени пользователя 5 символов")
      .max(64, "Максимальная длина имени пользователя 64 символа"),

    name: z
      .string({ required_error: "Ваше имя обязательно!" })
      .min(5, "Ваше имя не должно быть короче 5 символов")
      .max(64, "Ваше имя не должно быть длиннее 64 символов"),

    password: z
      .string({ required_error: "Пароль обязателен!" })
      .min(8, "Слишком короткий пароль (минимум 8 символов)")
      .max(64, "Пароль не может быть длиннее 64 символов"),

    description: z.optional(z.string()),

    roleId: z
      .number({ required_error: "Укажите, кем вы работаете!" })
      .positive()
      .finite(),
  })
  .strict({ message: "Вероятно, указаны дополнительные поля" });

export type createUserDto = z.infer<typeof createUser>;
