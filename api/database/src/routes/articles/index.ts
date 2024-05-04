import { Router } from "express";
import controller from "../../controllers/articles";
import { validateDtoMiddleware } from "../../middleware";
import { CreateArticleDto, UpdateArticleDto } from "../../dto/articles";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", validateDtoMiddleware(CreateArticleDto), controller.create);
router.put("/:id", validateDtoMiddleware(UpdateArticleDto), controller.update);
router.delete("/:id", controller.remove);

export default router;
