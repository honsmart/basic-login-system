const express = require("express");
const router = express.Router();
var authController = require("../controllers/auth.contoller")

router.post('/login', authController.Login);


module.exports = router;
 