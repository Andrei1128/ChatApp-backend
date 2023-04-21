import { Router } from "express";
import ChatController from "../controllers/chat";

const router = Router();

router.post("/chat", ChatController.createChat);
router.get("/:id", ChatController.findChat);
router.delete("/delete/:id", ChatController.deleteChat);

export default router;
