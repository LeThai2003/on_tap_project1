const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const dataIotRoutes = require("./iot.route");

module.exports = (app) => {
    app.use("/", homeRoutes);
    
    app.use("/products", productRoutes);

    app.use("/iot", dataIotRoutes);
}