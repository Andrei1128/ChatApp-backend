import { Router } from "express";
import ProfileController from "../controllers/profile";

const router = Router();

router.get("/findChat/:id", ProfileController.findChat);
router.post("/createChat", ProfileController.createChat);
router.patch("/add", ProfileController.addFriend);
router.patch("/accept", ProfileController.acceptFriend);
router.patch("/decline", ProfileController.declineFriend);
router.patch("/remove", ProfileController.removeFriend);
router.get("/myProfile", ProfileController.getMyProfile);
router.get("/friends/:id", ProfileController.getFriendProfile);
router.get("/friends", ProfileController.getAllFriendProfiles);
router.get("/peoples/:name", ProfileController.getPeople);

export default router;
