const express =
  require("express");

const router =
  express.Router();

const {
  getMessages,
} = require(
  "../controllers/chatController"
);

router.get(
  "/:senderId/:receiverId",
  getMessages
);

module.exports =
  router;