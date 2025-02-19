const express = require("express");
const router = express.Router();
const { newsLetter } = require("../controllers/newsLetterController");

router.post("/newsletter", newsLetter);

module.exports = router;