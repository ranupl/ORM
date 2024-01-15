const searchController = require("../controllers/searchController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/name", auth, searchController.getByName);
router.get("/phonenumber", auth, searchController.getByPhoneNumber);
router.get("/phoneinfo", auth, searchController.getPhoneNumberInfo);

module.exports = router;
