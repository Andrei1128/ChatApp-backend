const router = require("express").Router();

const {
  add,
  accept,
  decline,
  getMe,
  get,
  getAll,
  getPeople,
} = require("../controller/profile");

router.post("/:id", add);
router.put("/:id", accept);
router.delete("/:id", decline);
router.get("/me", getMe);
router.get("/:id", get);
router.get("/", getAll);
router.post("/", getPeople);

module.exports = router;
