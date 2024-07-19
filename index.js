const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const port = process.env.PORT;


const routesClient = require("./routes/client/index.route");

app.set("views", "./views");
app.set("view engine", "pug");

//routes
routesClient(app);

app.listen(port, () => {
    console.log("Đang chạy trên cổng: " + port);
})