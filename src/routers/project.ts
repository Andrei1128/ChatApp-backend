import ProjectController from "../controllers/project";
import { updateNameValidator } from "../middlewares/profileValidator";

import HandledRouter from "../utilities/HandledRouter";

const handledRouter = new HandledRouter();
handledRouter.post(
  "/project",
  updateNameValidator,
  ProjectController.createProject
);

export default handledRouter.getRouter();
