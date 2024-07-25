
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../middlewares/uploadMiddleware");

// Yeni kategori ekleyen endpoint
router.post("/", upload.single("image"), categoryController.createCategory);
router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", upload.single("image"), categoryController.categoryUpdate);
router.delete("/:id", categoryController.deleteCategory);


module.exports = router;
