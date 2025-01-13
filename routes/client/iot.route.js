const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/dataIot.controller");

route.get("/upload-data", controller.getData);

module.exports = route;