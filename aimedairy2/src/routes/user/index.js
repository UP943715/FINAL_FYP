const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/diary", require("./diary"));

module.exports = router;
