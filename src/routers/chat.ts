import { Router } from "express";
import ChatController from "../controllers/chat";

const router = Router();

router.post("/create", ChatController.createChat);
router.get("/:id", ChatController.findChat);

export default router;
