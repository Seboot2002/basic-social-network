const express = require("express");
const router = express.Router();

const MessageController = require("../controllers/message.controller");
const verifyToken = require("../controllers/verifyToken");

router.post("/message", verifyToken, MessageController.saveMessage);

router.get("/received-messages", verifyToken, MessageController.getReceivedMessages);

router.get("/my-messages", verifyToken, MessageController.getEmitMessages);

router.get("/unviewed-messages", verifyToken, MessageController.getUnviewedMessages);

router.post("/set-viewed-messages", verifyToken, MessageController.setViewedMessages);

module.exports = router;