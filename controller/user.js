const userModel = require("../model/user");
const tokenModel = require("../model/token");
const profileModel = require("../model/profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const userFound = await userModel
    .findOne({ email: req.body.email })
    .populate("profile");
  if (userFound) {
    if (bcrypt.compareSync(req.body.password, userFound.password)) {
      const token = jwt.sign(
        { profile: userFound.profile },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      await tokenModel.create({ content: token });
      res.json(token);
    } else return res.sendStatus(400);
  } else return res.sendStatus(400);
};

const register = async (req, res) => {
  if (!(await userModel.findOne({ email: req.body.email }))) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newProfile = await profileModel.create({
      nickname: req.body.nickname,
    });
    const newUser = await userModel.create({
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
    await tokenModel.create({ content: token });
    res.json(token);
  } else return res.sendStatus(400);
};

const logout = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    await tokenModel.findOneAndRemove({ content: token });
    res.sendStatus(200);
  } else return res.sendStatus(400);
};

module.exports = {
  login,
  register,
  logout,
};
