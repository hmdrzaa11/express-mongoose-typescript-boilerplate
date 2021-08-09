import { object, string } from "yup";

export let createPostSchema = object({
  body: object({
    title: string().required("title is required"),
    content: string().required("content is required"),
  }),
});
