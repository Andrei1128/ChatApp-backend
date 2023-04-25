import { Router } from "express";
import ChatController from "../controllers/chat";

const router = Router();

router.patch("/updateImage", ChatController.updateImage);
router.patch("/updateName", ChatController.updateName);
router.patch("/updateAbout", ChatController.updateAbout);
router.post("/chat", ChatController.createChat);
router.get("/:id", ChatController.findChat);
router.delete("/delete/:id", ChatController.deleteChat);

export default router;
