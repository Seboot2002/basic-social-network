require("./database");
const app = require("./app");
require('dotenv').config();

app.listen(process.env.PORT, (req, res)=>{
    console.log("Server on port", process.env.PORT);
});