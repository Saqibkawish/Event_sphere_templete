const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message-controller");
const auth = require('../middlewares/authMiddleware');

router.post("/send", auth, messageController.sendMessage);
router.get("/conversation/:otherUserId", auth, messageController.getMessages);

module.exports = router;
