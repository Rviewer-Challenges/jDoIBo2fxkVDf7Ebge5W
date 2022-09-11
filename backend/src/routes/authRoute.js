const { Router } = require("express");
const { validateLogin } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJwt");
const { login, renewToken } = require("../controllers/authController");

const router = Router();

router.post("/login", [validateLogin], login);

router.get("/renew", [validateJWT], renewToken);

module.exports = router;
