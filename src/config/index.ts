import dotenv from "dotenv";
dotenv.config();

export default {
  port: parseInt(process.env.PORT!) || 3000,
  host: process.env.HOST || "localhost",
  dbUri: process.env.DB_URI || "mongodb://127.0.0.1:27017/train",
};
