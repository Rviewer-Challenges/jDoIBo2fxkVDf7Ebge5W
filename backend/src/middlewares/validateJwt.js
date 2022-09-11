const jwt = require("jsonwebtoken");
const { configEnv } = require("../env/config");
const { jwtSecret } = configEnv;

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Must provide a token",
    });
  }

  try {
    const { id } = jwt.verify(token, jwtSecret);
    req.id = id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token invalid, try again",
    });
  }
};

module.exports = {
  validateJWT,
};
