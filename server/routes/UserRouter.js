const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController");

router.post("/login", controller.login);

router.post("/register", controller.register);

router.post("/logout", controller.logout);

router.get("/logged_in", controller.loggedIn);

module.exports = router;