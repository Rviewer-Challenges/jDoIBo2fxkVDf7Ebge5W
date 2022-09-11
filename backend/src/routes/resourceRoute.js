const { Router } = require("express");
const {
  createResource,
  updateResource,
  getResources,
  getResourceById,
} = require("../controllers/resourceController");
const { validateCategory } = require("../middlewares/validateCategory");
const {
  validateMongoID,
  validateCategoryID,
} = require("../middlewares/validateMongoID");

const router = Router();

router.get("/", [validateCategoryID], getResources);
router.get("/:id", [validateMongoID], getResourceById);

router.post("/", [validateCategory], createResource);

router.put("/:id", [validateMongoID], updateResource);

module.exports = router;
