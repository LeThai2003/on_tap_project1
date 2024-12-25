const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multerUpload = require("../../helpers/upload-multer.helper");
const validate = require("../../validates/admin/product.validate");

const multer  = require('multer')

const storage = multerUpload();

const upload = multer({ storage: storage })

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteProduct);

route.get("/create", controller.create);

route.post("/create", upload.single('thumbnail'), validate.createProduct, controller.createPost);

module.exports = route;