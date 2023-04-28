import UserController from "../controllers/user";
import { registerValidator } from "../middlewares/authValidator";

import HandledRouter from "./HandledRouter";

HandledRouter.post("/login", UserController.login);
HandledRouter.post("/register", registerValidator, UserController.register);
HandledRouter.delete("/logout", UserController.logout);

export default HandledRouter.getRouter();
