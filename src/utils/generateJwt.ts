import jwt from "jsonwebtoken";
import config from "../config";

export const generateJwt = (id: string) => {
  let token = jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.expiresIn,
  });
  return token;
};
