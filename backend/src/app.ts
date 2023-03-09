import "dotenv/config";
import morgan from "morgan";
import customerRoute from "./routes/customers";

import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

//middlewares

app.use(morgan("dev"));
//this line is here so we can accept json
app.use(express.json());

app.use("/api/customers", customerRoute);

//error handler if we don't have route setup

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
