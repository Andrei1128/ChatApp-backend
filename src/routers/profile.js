const router = require("express").Router();

const {
  findChat,
  createChat,
  addFriend,
  acceptFriend,
  declineFriend,
  removeFriend,
  getMyProfile,
  getFriendProfile,
  getAllFriendProfiles,
  getPeople,
} = require("../controllers/profile");

router.get("/findChat/:id", findChat);
router.post("/createChat", createChat);
router.patch("/add", addFriend);
router.patch("/accept", acceptFriend);
router.patch("/decline", declineFriend);
router.patch("/remove", removeFriend);
router.get("/myProfile", getMyProfile);
router.get("/friends/:id", getFriendProfile);
router.get("/friends", getAllFriendProfiles);
router.get("/peoples/:nickname", getPeople);

module.exports = router;
