const express = require("express");
const router = express.Router();

const FollowController = require("../controllers/follow.controller");
const verifyToken = require("../controllers/verifyToken");

router.post("/follow", verifyToken, FollowController.saveFollow);

router.delete("/follow/:id", verifyToken, FollowController.deleteFollow);

router.get("/following/:id?", verifyToken, FollowController.getFollowingUsers);

router.get("/followed/:id?", verifyToken, FollowController.getFollowedUsers);

router.get("/get-my-follows", verifyToken, FollowController.getMyFollows);

module.exports = router;