import ProfileController from "../controllers/profile";
import {
  updateNameValidator,
  imageValidator,
} from "../middlewares/profileValidator";

import HandledRouter from "../utilities/HandledRouter";
const handledRouter = new HandledRouter();

handledRouter.patch("/add", ProfileController.addFriend);
handledRouter.patch("/accept", ProfileController.acceptFriend);
handledRouter.patch("/decline", ProfileController.declineFriend);
handledRouter.patch("/remove", ProfileController.removeFriend);
handledRouter.patch(
  "/updateName",
  updateNameValidator,
  ProfileController.updateName
);
handledRouter.patch("/updateAbout", ProfileController.updateAbout);
handledRouter.patch(
  "/updateImage",
  imageValidator,
  ProfileController.updateImage
);
handledRouter.get("/myProfile", ProfileController.getMyProfile);
handledRouter.get("/friends/:id", ProfileController.getFriendProfile);
handledRouter.get("/friends", ProfileController.getFriendsProfiles);
handledRouter.get("/peoples/:name", ProfileController.getPeople);
handledRouter.get("/requests", ProfileController.getRequests);

export default handledRouter.getRouter();
