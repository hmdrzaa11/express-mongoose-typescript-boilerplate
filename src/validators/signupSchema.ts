import { object, string, ref } from "yup";

export let signupSchema = object({
  body: object({
    username: string()
      .required("username is required")
      .min(4, "username must be at least 4chars")
      .trim(),
    email: string()
      .required("email is required")
      .email("invalid email address")
      .lowercase()
      .trim(),
    password: string()
      .required("password is required")
      .min(8, "password must be at least 8chars")
      .trim(),
    passwordConfirm: string()
      .required("passwordConfirm is required")
      .oneOf([ref("password"), null], "password must match"),
  }),
});
