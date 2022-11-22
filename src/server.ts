import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import http from "http";

import authorRouter from "./routers/Author";
import bookRouter from "./routers/Book";
import userRouter from "./routers/User";

const app = express();

/**Connect to Database */

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("Connected to MongoDB");
    StartServer();
  })
  .catch((error) => Logging.error("Unable to connect ERR -> " + error));

/**Only start server if Mongo Connect */

const StartServer = () => {
  /**Log the Request */

  app.use((req, res, next) => {
    Logging.info(
      `Incoming -> Method [${req.method}] - URL -> [${req.url}] - IP -> [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logging.info(
        `Incoming -> Method [${req.method}] - URL -> [${req.url}] - IP -> [${req.socket.remoteAddress}] - Status -> [${req.statusCode}]`
      );
    });

    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /**Rules of API */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type,Accept,Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
    }

    next();
  });

  /**Routes */
  app.use("/author", authorRouter);
  app.use("/book", bookRouter);
  app.use("/user", userRouter);

  /**Healthcheck */

  app.get("/ping", (req, res, next) => {
    res.status(400).json({ message: "pong" });
  });

  /**Error Handling */

  app.use((req, res, next) => {
    const error = new Error("Not found");
    Logging.error(error);
    return res.status(404).json({ message: error });
  });

  http.createServer(app).listen(config.server.port, () => {
    Logging.info("Server is listening on port :" + config.server.port);
  });
};
