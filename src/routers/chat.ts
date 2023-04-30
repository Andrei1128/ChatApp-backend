import ChatController from "../controllers/chat";
import {
  imageValidator,
  updateNameValidator,
} from "../middlewares/profileValidator";

import HandledRouter from "../utilities/HandledRouter";

const handledRouter = new HandledRouter();

handledRouter.patch("/updateImage", imageValidator, ChatController.updateImage);
handledRouter.patch(
  "/updateName",
  updateNameValidator,
  ChatController.updateName
);
handledRouter.patch("/updateAbout", ChatController.updateAbout);
handledRouter.post("/chat", updateNameValidator, ChatController.createChat);
handledRouter.delete("/delete/:id", ChatController.deleteChat);

export default handledRouter.getRouter();
