const express = require("express");
const multer  = require('multer')
// import { v2 as cloudinary } from 'cloudinary';
const route = express.Router();
const controller = require("../../controllers/admin/product.controller");
// const multerUpload = require("../../helpers/upload-multer.helper");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
 
// const storage = multerUpload();

// const upload = multer({ storage: storage })


const upload = multer()

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteProduct);

route.get("/create", controller.create);

route.post("/create", 
    upload.single('thumbnail'),  
    uploadCloud.uploadSingle, 
    validate.createProduct,
    controller.createPost
);

route.get("/edit/:id", controller.edit);

route.patch("/edit/:id", upload.single('thumbnail'), validate.createProduct, controller.editPatch)

route.get("/detail/:id", controller.detail);

module.exports = route;