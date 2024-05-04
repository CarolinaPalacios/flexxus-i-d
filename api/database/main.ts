import express from "express";
import morgan from "morgan";
import { errorHandler } from "./src/handlers";
import { ClientError } from "./src/utils/errors";
import { router } from "./src/routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(router);

app.use("*", () => {
  throw new ClientError("Not found", 404);
});

app.use(errorHandler);

app.listen(3003, () => {
  console.log("Database service up and running on port 3003");
});
