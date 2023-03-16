const userModel = require("../model/user");
const tokenModel = require("../model/token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const userFound = await userModel.findOne({ email: req.body.email });
  if (userFound) {
    if (bcrypt.compareSync(req.body.password, userFound.password)) {
      const token = jwt.sign({ user: userFound }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      await tokenModel.create({ content: token });
      res.json(token);
    } else return res.status(400).send("Incorrect password!");
  } else return res.status(400).send("Account not found!");
};

const register = async (req, res) => {
  if (!(await userModel.findOne({ email: req.body.email }))) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await userModel.create({ ...req.body, password: hash });
    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    await tokenModel.create({ content: token });
    res.json(token);
  } else return res.status(400).send("Email used!");
};

const logout = async (req, res) => {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    await tokenModel.findOneAndRemove({ content: token });
    res.status(200).send("Disconnected successfully!");
  } else return res.status(400).send("Token is missing!");
};

module.exports = {
  login,
  register,
  logout,
};
