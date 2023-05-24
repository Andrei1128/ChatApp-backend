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

export default handledRouter.getRouter();
