const express = require("express");
const multer  = require('multer');
const controller = require("../../controllers/admin/product-category.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product-category.validate");
const route = express.Router();

const upload = multer()

route.get("/", controller.index);

route.get("/create", controller.create);

route.post("/create", upload.single('thumbnail'), uploadCloud.uploadSingle, validate.createProductCategory, controller.createPost);

module.exports = route;