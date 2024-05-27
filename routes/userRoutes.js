const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const router = express.Router();
const validationTokenHandler =  require("../middleware/validateTokenHandler");



router.post("/register", registerUser);

router.get("/current", validationTokenHandler, currentUser);

router.post("/login", loginUser);

module.exports = router;