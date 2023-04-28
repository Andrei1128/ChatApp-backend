import ChatController from "../controllers/chat";
import {
  imageValidator,
  updateNameValidator,
} from "../middlewares/profileValidator";

import HandledRouter from "./HandledRouter";

HandledRouter.patch("/updateImage", imageValidator, ChatController.updateImage);
HandledRouter.patch(
  "/updateName",
  updateNameValidator,
  ChatController.updateName
);
HandledRouter.patch("/updateAbout", ChatController.updateAbout);
HandledRouter.post("/chat", updateNameValidator, ChatController.createChat);
HandledRouter.get("/:id", ChatController.findChat);
HandledRouter.delete("/delete/:id", ChatController.deleteChat);

export default HandledRouter.getRouter();
