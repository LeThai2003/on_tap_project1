const { paginationHelper } = require("../../helpers/pagination.helper");
const DataIot = require("../../models/dataIot.model");
const Product = require("../../models/product.model");

//[GET] /products
module.exports.index = async (req, res) => {

    try {
        const find = {
            status: "active",
            deleted: false,
        }
    
        // -----pagination----
        const countProduct = await Product.countDocuments(find);
    
        const objectPagination = paginationHelper(req, countProduct, 8);
        // -----end pagination----
    
        const products = await Product.find(find)
            .sort({position: "desc"})
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);
    
        for (const item of products) {
            const newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(2);
            item.newPrice = newPrice;
        }
        // console.log(products);
    
        res.render("client/pages/products/index", {
            pageTitle: "Danh sách sản phẩm",
            products: products,
            pagination: objectPagination
        });
    } catch (error) {
        console.log(error);
        res.redirect("/products")
    }
}

// [GET] /products/detail/slug
module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;

        // console.log(slug);
        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        });

        console.log(product);

        // res.send("ok");
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })

    } catch (error) {
        console.log("Chi tiết sản phẩm CLIENT " + error);
        res.redirect("/")
    }
}
