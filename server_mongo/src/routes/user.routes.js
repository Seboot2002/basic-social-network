const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const verifyToken = require("../controllers/verifyToken");
const multer = require("../libs/multer");

//rutas
router.post("/register", UserController.saveUser);

router.post("/login", UserController.loginUser);

router.get("/getUser/:id?", verifyToken, UserController.getUser);

router.get("/getUsers", verifyToken, UserController.getUsers);

router.get("/getProfile/:id?", verifyToken, UserController.getProfileOnly);

router.get("/getProfiles", verifyToken, UserController.getProfilesOnly);

router.get("/counters", verifyToken, UserController.getCounters);

router.put("/update-user", verifyToken, multer.single("avatar"), UserController.updateUser);

router.post("/upload-image-user", verifyToken, multer.single("avatar") ,UserController.uploadImage);

module.exports = router;