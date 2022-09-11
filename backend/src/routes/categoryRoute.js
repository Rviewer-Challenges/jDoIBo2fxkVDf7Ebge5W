const { Router } = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
} = require("../controllers/categoryController");

const { validateMongoID } = require("../middlewares/validateMongoID");

const router = Router();

router.get("/", getCategories);
router.get("/:id", validateMongoID, getCategoryById);

router.post("/", createCategory);

module.exports = router;
