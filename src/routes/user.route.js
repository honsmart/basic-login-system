const express = require("express");
const router = express.Router();
var userController = require("../controllers/user.controller")
var AuthMiddleware = require("../middleware/auth.middleware")

router.post('/create',  userController.create);
router.get('/profile/:id', AuthMiddleware, userController.profile);
router.delete('/delete', AuthMiddleware, userController.delete);

module.exports = router;
 