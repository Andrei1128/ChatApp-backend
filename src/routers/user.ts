import { Router } from "express";
import UserController from "../controllers/user";
import { registerValidator } from "../middlewares/authValidator";

const router = Router();

router.post("/login", UserController.login);
router.post("/register", registerValidator, UserController.register);
router.delete("/logout", UserController.logout);

export default router;
