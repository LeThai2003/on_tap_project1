const dashboardRoute = require("./dashboard.route");
const productRoutes = require("./product.route");
const trashProductRoutes = require("./trashProduct.route");
const system = require("../../configs/system");

module.exports = (app) => {
    const PATH_ADMIN = `/${system.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);

    app.use(`${PATH_ADMIN}/products`, productRoutes);

    app.use(`${PATH_ADMIN}/trash-products`, trashProductRoutes);
}


