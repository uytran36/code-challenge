import { Router } from "express";
import { ResourceController } from "../controllers/resource.controller";

const router = Router();
const resourceController = new ResourceController();

router.post("/resources", resourceController.create);
router.get("/resources", resourceController.getAll);
router.get("/resources/:id", resourceController.getById);
router.put("/resources/:id", resourceController.updateById);
router.delete("/resources/:id", resourceController.deleteById);

export default router;
