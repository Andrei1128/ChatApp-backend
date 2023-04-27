import { Router } from "express";
import ChatController from "../controllers/chat";
import {
  imageValidator,
  updateNameValidator,
} from "../middlewares/profileValidator";

const router = Router();

router.patch("/updateImage", imageValidator, ChatController.updateImage);
router.patch("/updateName", updateNameValidator, ChatController.updateName);
router.patch("/updateAbout", ChatController.updateAbout);
router.post("/chat", updateNameValidator, ChatController.createChat);
router.get("/:id", ChatController.findChat);
router.delete("/delete/:id", ChatController.deleteChat);

export default router;
