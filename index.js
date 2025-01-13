const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors')
const app = express();
const database = require("./configs/database");
const system = require("./configs/system");
dotenv.config();

const port = process.env.PORT;
//kết nối database
database.connect();

app.use(cors())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// flash
app.use(cookieParser('keyboard'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

//App variable
app.locals.prefixAdmin = system.prefixAdmin;

//routes
routesClient(app);
routesAdmin(app);

app.listen(port, () => {
    console.log("Đang chạy trên cổng: " + port);
})