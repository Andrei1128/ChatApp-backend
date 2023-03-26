const tokenModel = require("../model/token");
const jwt = require("jsonwebtoken");

const authGuard = async (req, res, next) => {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    const tokenFound = await tokenModel.findOne({ content: token });
    if (tokenFound) {
      try {
        decoded = jwt.verify(tokenFound.content, process.env.JWT_SECRET);
      } catch (e) {
        await tokenModel.findByIdAndRemove(tokenFound._id);
        return res.sendStatus(400);
      }
      req.profileId = decoded.profile;
      next();
    } else return res.sendStatus(400);
  } else return res.sendStatus(400);
};

module.exports = authGuard;
