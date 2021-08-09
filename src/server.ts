import mongoose from "mongoose";
import { Server } from "http";
import config from "./config";
import app from "./app";

let server: Server | undefined = undefined;

mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("DB in the house!");
  })
  .catch((err) => {
    console.log(err);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
  });

server = app.listen(config.port, config.host, () => {
  console.log("server on  ", config.port);
});
