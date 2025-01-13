const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/dataIot.controller");

route.post("/upload-data", controller.getData);

module.exports = route;