import { object, string } from "yup";

export const signinSchema = object({
  body: object({
    email: string()
      .required("email is required")
      .email("invalid email address"),

    password: string()
      .required("password is required")
      .min(8, "password must be at least 8chars"),
  }),
});
