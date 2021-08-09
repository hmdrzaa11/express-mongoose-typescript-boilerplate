import { object, string, ref } from "yup";

export let updatePasswordSchema = object({
  body: object({
    password: string()
      .required("password is required")
      .min(8, "password must be at least 8char")
      .trim(),
    newPassword: string()
      .required("newPassword is required")
      .min(8, "password must be at least 8char")
      .trim(),
    passwordConfirm: string()
      .required("passwordConfirm is required")
      .oneOf([ref("newPassword"), null], "passwords don't match"),
  }),
});
