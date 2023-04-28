import ProfileController from "../controllers/profile";
import {
  updateNameValidator,
  imageValidator,
} from "../middlewares/profileValidator";

import HandledRouter from "./HandledRouter";

HandledRouter.patch("/add", ProfileController.addFriend);
HandledRouter.patch("/accept", ProfileController.acceptFriend);
HandledRouter.patch("/decline", ProfileController.declineFriend);
HandledRouter.patch("/remove", ProfileController.removeFriend);
HandledRouter.patch(
  "/updateName",
  updateNameValidator,
  ProfileController.updateName
);
HandledRouter.patch("/updateAbout", ProfileController.updateAbout);
HandledRouter.patch(
  "/updateImage",
  imageValidator,
  ProfileController.updateImage
);
HandledRouter.get("/myProfile", ProfileController.getMyProfile);
HandledRouter.get("/friends/:id", ProfileController.getFriendProfile);
HandledRouter.get("/friends", ProfileController.getFriendsProfiles);
HandledRouter.get("/peoples/:name", ProfileController.getPeople);
HandledRouter.get("/requests", ProfileController.getRequests);

export default HandledRouter.getRouter();
