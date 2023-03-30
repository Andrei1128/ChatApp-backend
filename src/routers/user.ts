import { Router } from "express";
import UserController from "../controllers/user";

const router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.delete("/logout", UserController.logout);

export default router;