const router = require("express").Router();

const { login, register, logout } = require("../controller/user");

router.post("/login", login);
router.post("/register", register);
router.post("/", logout);

module.exports = router;
