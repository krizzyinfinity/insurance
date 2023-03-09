import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

mongoose
  .connect(env.MONGO)
  .then(() => {
    console.log("Connected!");
    app.listen(5000, () => {
      console.log("connected!!");
    });
  })
  .catch(console.error);
