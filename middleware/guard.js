const tokenModel = require("../model/token");
const jwt = require("jsonwebtoken");

const guard = async (req, res, next) => {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth && headerAuth.split(" ")[1];
  if (token) {
    const tokenFound = await tokenModel.findOne({ content: token });
    if (tokenFound) {
      try {
        decoded = jwt.verify(tokenFound.content, process.env.JWT_SECRET);
      } catch (e) {
        await tokenModel.findByIdAndRemove(tokenFound._id);
        return res.status(400).send("Session expired!");
      }
      req.profileId = decoded.profile;
      next();
    } else return res.status(400).send("Invalid token!");
  } else return res.status(400).send("Token is missing!");
};

module.exports = guard;
