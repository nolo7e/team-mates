import { z } from "zod";

export const signInUser = z
  .object({
    email: z
      .string({ required_error: "Почта обязательна!" })
      .email({ message: "Введите, пожалуйста, настоящий адрес почты" })
      .min(5, "Минимальная длина почты 5 символов")
      .max(64, "Максимальная длина почты 64 символа"),

    password: z
      .string({ required_error: "Пароль обязателен!" })
      .min(8, "Слишком короткий пароль (минимум 8 символов)")
      .max(64, "Пароль не может быть длиннее 64 символов"),
  })
  .strict({ message: "Вероятно, указаны дополнительные поля" });

export type signInUserDto = z.infer<typeof signInUser>;
