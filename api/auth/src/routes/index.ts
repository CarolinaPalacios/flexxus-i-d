import { Router } from "express";
import controller from "../controller";

export const router = Router();

router.use("/login", controller.login);
router.use("/register", controller.register);
