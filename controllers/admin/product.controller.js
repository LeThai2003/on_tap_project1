const { filterStatus } = require("../../helpers/filterStatus.helper");
const Product = require("../../models/product.model");

//[GET] /admin/product
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    };

    // filter status
    const filterState = filterStatus(req);
    
    if(req.query.status)
    {
        find["status"] = req.query["status"];
    }
    // end filter status

    // search
    if(req.query.keyword)
    {
        const regTitle = new RegExp(req.query.keyword, "i");
        find.title = regTitle;
    }
    // end search

    const products = await Product.find(find);

    // console.log(products);

    res.render("admin/pages/product/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterState: filterState,
        keyword: req.query.keyword
    })
}