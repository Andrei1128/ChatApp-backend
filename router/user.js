const router = require("express").Router();

const { login, register, logout } = require("../controller/user");

router.post("/login", login);
router.post("/register", register);
router.delete("/", logout);

module.exports = router;
