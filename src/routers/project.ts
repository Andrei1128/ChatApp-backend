import ProjectController from "../controllers/project";
import { updateNameValidator } from "../middlewares/profileValidator";

import HandledRouter from "../utilities/HandledRouter";

const handledRouter = new HandledRouter();
handledRouter.post(
  "/project",
  updateNameValidator,
  ProjectController.createProject
);

handledRouter.post("/createCode", ProjectController.createCode);
handledRouter.post("/join", ProjectController.joinProject);
handledRouter.post("/addChat", ProjectController.addChat);
handledRouter.post("/addPoll", ProjectController.addPoll);
handledRouter.post("/addDeadline", ProjectController.addDeadline);
handledRouter.post("/vote", ProjectController.vote);
handledRouter.post("/addEndline", ProjectController.addEndline);
handledRouter.delete("/deleteEndline/:id", ProjectController.deleteEndline);

export default handledRouter.getRouter();
