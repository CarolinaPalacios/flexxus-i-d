import { Router } from "express";
import { default as articlesRouter } from "./articles";
import { default as authRouter } from "./auth";

export const router = Router();

router.use("/articles", articlesRouter);
router.use("/auth", authRouter);
