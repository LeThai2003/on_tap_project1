const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/trashProduct.controller");

route.get("/", controller.index);

route.patch("/back/:id", controller.backProduct);

module.exports = route;