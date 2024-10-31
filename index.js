const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const database = require("./configs/database");
const system = require("./configs/system");
dotenv.config();

const port = process.env.PORT;
//kết nối database
database.connect();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

//App variable
app.locals.prefixAdmin = system.prefixAdmin;

//routes
routesClient(app);
routesAdmin(app);

app.listen(port, () => {
    console.log("Đang chạy trên cổng: " + port);
})