const jwt = require("jsonwebtoken");
const { configEnv } = require("../env/config");
const { jwtSecret } = configEnv;

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(payload, jwtSecret, { expiresIn: "12h" }, (err, token) => {
      err ? reject(null) : resolve(token);
    });
  });
};

module.exports = {
  generateJWT,
};
