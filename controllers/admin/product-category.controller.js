const { prefixAdmin } = require("../../configs/system");
const ProductCategory = require("../../models/product-categories.model");

//[GET] /admin/product-categories
module.exports.index = async (req, res) => {
    try {

        const find = {
            deleted: false
        }

        const productCategories = await ProductCategory.find(find);

        res.render("admin/pages/product-categories/index", {
            pageTitle: "Danh mục sản phẩm",
            productCategories: productCategories
        })
    } catch (error) {
        console.log("Error in product-categories index: " + error);
        res.redirect(`/${prefixAdmin}/product-categories`);
    }
}

// [GET] /admin/product-categories/create
module.exports.create = async (req, res) => {
    try {
        
        res.render("admin/pages/product-categories/create", {
            pageTitle: "Thêm mới danh mục",
        })
    } catch (error) {
        console.log("Error in product-categories create get: " + error);
        res.redirect(`/${prefixAdmin}/product-categories`);
    }
}

// [POST] /admin/product-categories/create
module.exports.createPost = async (req, res) => {
    try {
        
        console.log(req.body);
        if(!req.body.position)
        {
            const countProductCategories = await ProductCategory.countDocuments({deleted: false});
            req.body.position = countProductCategories + 1;
        }
        else
        {
            req.body.position = parseInt(req.body.position);
        }
        
        const data = new ProductCategory(req.body);
        await data.save();

        res.redirect(`/${prefixAdmin}/product-categories`);
    } catch (error) {
        console.log("Error in product-categories create post: " + error);
        res.redirect(`/${prefixAdmin}/product-categories`);
    }
}