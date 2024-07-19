const express = require("express");

const app = express();
const port = 3000;

const routesClient = require("./routes/client/index.route");

app.set("views", "./views");
app.set("view engine", "pug");

//routes
routesClient(app);

app.listen(port, () => {
    console.log("Đang chạy trên cổng: " + port);
})