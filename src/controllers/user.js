const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createToken, deleteToken } = require("../services/token");
const { createProfile } = require("../services/profile");
const { findUser, createUser } = require("../services/user");

const login = async (req, res) => {
  const userFound = findUser(req.body.email);
  if (userFound) {
    if (bcrypt.compareSync(req.body.password, userFound.password)) {
      const token = jwt.sign(
        { profile: userFound.profile },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      createToken(token);
      res.json(token);
    } else return res.sendStatus(400);
  } else return res.sendStatus(400);
};

const register = async (req, res) => {
  if (!findUser(req.body.email)) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newProfile = createProfile(req.body.nickname);
    const newUser = createUser({
      ...req.body,
      password: hash,
      profile: newProfile,
    });
    const token = jwt.sign(
      { profile: newUser.profile },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    createToken(token);
    res.json(token);
  } else return res.sendStatus(400);
};

const logout = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    deleteToken(token);
    res.sendStatus(200);
  } else return res.sendStatus(400);
};

module.exports = {
  login,
  register,
  logout,
};
