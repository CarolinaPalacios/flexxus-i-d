import express from "express";
import morgan from "morgan";
import { errorHandler } from "./src/handlers";
import { ClientError } from "./src/utils/errors";
import { router } from "./src/routes";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/", router);

app.use("*", () => {
  throw new ClientError("Not found", 404);
});

app.use(errorHandler);

app.listen(3002, () => {
  console.log(`Articles service up and running on port 3002`);
});
