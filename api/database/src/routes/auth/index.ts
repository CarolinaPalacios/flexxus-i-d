import { Router } from "express";
import controller from "../../controllers/auth";
import { validateDtoMiddleware } from "../../middleware";
import { LoginDto, RegisterDto } from "../../dto/auth";

const router = Router();

router.post("/login", validateDtoMiddleware(LoginDto), controller.login);
router.post(
  "/register",
  validateDtoMiddleware(RegisterDto),
  controller.register
);

export default router;
