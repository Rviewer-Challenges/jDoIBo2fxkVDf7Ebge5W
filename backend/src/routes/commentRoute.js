const { Router } = require("express");
const {
  createComment,
  updateComment,
  getComments,
} = require("../controllers/commentController");

const { validateCreateComment } = require("../middlewares/validateFields");
const { validateMongoID } = require("../middlewares/validateMongoID");
const { validateJWT } = require("../middlewares/validateJwt");

const router = Router();

router.get("/:id", [validateMongoID], getComments);

router.post("/", [validateCreateComment], createComment);

router.patch("/:id", [validateJWT, validateMongoID], updateComment);

module.exports = router;
