const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middlewares/uploadMiddleware");

router.get("/profile", authController.getUserProfile);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.put(
  "/update/:id",
  upload.single("profileImage"),
  authController.updateUser
);

module.exports = router;
