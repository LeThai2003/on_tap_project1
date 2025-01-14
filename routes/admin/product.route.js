const express = require("express");
const multer  = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// import { v2 as cloudinary } from 'cloudinary';
const route = express.Router();
const controller = require("../../controllers/admin/product.controller");
// const multerUpload = require("../../helpers/upload-multer.helper");
const validate = require("../../validates/admin/product.validate");
 
// const storage = multerUpload();

// const upload = multer({ storage: storage })


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});

const upload = multer()

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteProduct);

route.get("/create", controller.create);

route.post("/create", upload.single('thumbnail'),  
function (req, res, next) {
    if(req.file)
    {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.url;
            next();
        }
    
        upload(req);
    }
    else
    {
        next();
    }
}
, validate.createProduct
,controller.createPost);

route.get("/edit/:id", controller.edit);

route.patch("/edit/:id", upload.single('thumbnail'), validate.createProduct, controller.editPatch)

route.get("/detail/:id", controller.detail);

module.exports = route;