const express = require("express");
const router = express.Router();

const controller = require("../controllers/MessageController");

router.get("/all", controller.getAll);

router.get("/unread", controller.getUnread);

router.get("/unread/count", controller.countUnread);

router.post("/read", controller.read);

router.post("/send", controller.send);

module.exports = router;