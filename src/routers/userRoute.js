const userController = require("../controllers/userController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// addContact - for testing purpose
router.post("/addContact", auth, userController.addContact);

module.exports = router;
