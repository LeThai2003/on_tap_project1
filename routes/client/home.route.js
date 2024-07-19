const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
    res.render("./client/pages/home/index");
})

module.exports = route;