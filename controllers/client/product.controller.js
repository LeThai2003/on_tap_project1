const Product = require("../../models/product.model");

//[GET] /products
module.exports.index = async (req, res) => {

    const products = await Product.find({
        status: "active",
        deleted: false,
    });

    for (const item of products) {
        const newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(2);
        item.newPrice = newPrice;
    }

    console.log(products);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}