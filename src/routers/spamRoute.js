const spamController = require("../controllers/spamController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.put("/markSpam", auth, spamController.markSpam);
router.get("/checkSpam", auth, spamController.checkSpam);

module.exports = router;
