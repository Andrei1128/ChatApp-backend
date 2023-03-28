const router = require("express").Router();

const { login, register, logout } = require("../controllers/user");

router.post("/login", login);
router.post("/register", register);
router.delete("/logout", logout);

module.exports = router;
