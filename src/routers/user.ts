import UserController from "../controllers/user";
import { registerValidator } from "../middlewares/authValidator";

import HandledRouter from "../utilities/HandledRouter";
const handledRouter = new HandledRouter();

handledRouter.post("/login", UserController.login);
handledRouter.post("/register", registerValidator, UserController.register);
handledRouter.delete("/logout", UserController.logout);

export default handledRouter.getRouter();
