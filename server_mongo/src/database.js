const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.URL_SERVER)
.then(db => console.log("DB is connected"))
.catch(err => console.log(err));