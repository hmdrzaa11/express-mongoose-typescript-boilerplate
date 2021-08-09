import { object, string } from "yup";

export let updateSchema = object({
  body: object({
    username: string().min(4, "username can not be less than 4 char"),
    email: string().email("invalid email"),
  }),
});
