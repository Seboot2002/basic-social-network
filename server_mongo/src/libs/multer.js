const multer =  require("multer");
const path = require("path");
const {v4: uuid} = require("uuid");

const storage = multer.diskStorage({
    destination: path.resolve("public/uploads"),
    filename: (req, file, cb)=>{
        cb(null, uuid() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    dest: path.resolve("public/uploads"),
    limits: 2000000
});

module.exports = upload;