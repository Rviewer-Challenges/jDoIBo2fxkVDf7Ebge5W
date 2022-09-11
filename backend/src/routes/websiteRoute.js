const { Router } = require("express");
const {
  createWebsite,
  getWebsites,
  getWebsitesByResource,
  getWebsiteById,
  getWebsitesByUser,
} = require("../controllers/websiteController");
const {
  validateResourceID,
  validateMongoID,
} = require("../middlewares/validateMongoID");

const { validateJWT } = require("../middlewares/validateJwt");

const router = Router();

router.get("/", getWebsites);
router.get("/saved", [validateJWT], getWebsitesByUser);
router.get("/:id", [validateMongoID], getWebsiteById);
router.get("/resource/:id", [validateMongoID], getWebsitesByResource);

router.post("/", [validateResourceID], createWebsite);

module.exports = router;
