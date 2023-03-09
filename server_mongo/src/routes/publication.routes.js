const express= require("express");
const router = express.Router();
const multer = require("../libs/multer");

const PublicationController = require("../controllers/publication.controller");
const verifyToken = require("../controllers/verifyToken");

router.post("/publication", verifyToken, multer.single("image"), PublicationController.savePublication);

router.get("/getPublication/:id", verifyToken, PublicationController.getPublication);

router.get("/getPublications", verifyToken, PublicationController.getPublications);

router.get("/getPublicationsUser/:id?", verifyToken, PublicationController.getPublicationsUser);

router.delete("/deletePublication/:id", verifyToken, PublicationController.deletePublication);

router.post("/upload-image-pub/:id", verifyToken, multer.single("image") , PublicationController.uploadImage);

module.exports = router;