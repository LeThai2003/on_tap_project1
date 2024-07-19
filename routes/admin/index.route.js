const dashboardRoute = require("./dashboard.route");
const system = require("../../configs/system");

module.exports = (app) => {
    const PATH_ADMIN = `/${system.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute)
}