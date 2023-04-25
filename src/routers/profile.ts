import { Router } from "express";
import ProfileController from "../controllers/profile";

const router = Router();

router.patch("/add", ProfileController.addFriend);
router.patch("/accept", ProfileController.acceptFriend);
router.patch("/decline", ProfileController.declineFriend);
router.patch("/remove", ProfileController.removeFriend);
router.patch("/updateName", ProfileController.updateName);
router.patch("/updateAbout", ProfileController.updateAbout);
router.patch("/updateImage", ProfileController.updateImage);
router.get("/myProfile", ProfileController.getMyProfile);
router.get("/friends/:id", ProfileController.getFriendProfile);
router.get("/friends", ProfileController.getFriendsProfiles);
router.get("/peoples/:name", ProfileController.getPeople);
router.get("/requests", ProfileController.getRequests);

export default router;
