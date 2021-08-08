import dotenv from "dotenv";
dotenv.config();

export default {
  port: parseInt(process.env.PORT!) || 3000,
  host: process.env.HOST!,
  dbUri: process.env.DB_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  expiresIn: process.env.JWT_EXPIRES_IN!,
};
