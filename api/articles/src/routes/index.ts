import { Router } from "express";
import controller from "../controller";
import middlewares from "../middlewares";

export const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", middlewares.verifyToken, controller.create);
router.put("/:id", middlewares.verifyToken, controller.update);
router.delete("/:id", middlewares.verifyToken, controller.remove);
