const { filterStatus } = require("../../helpers/filterStatus.helper");
const { paginationHelper } = require("../../helpers/pagination.helper");
const { prefixAdmin } = require("../../configs/system");
const Product = require("../../models/product.model");

// [GET] /admin/trash-products
module.exports.index = async (req, res) => {
    try {
        const find = {
            deleted: true,
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
    
    
        // pagination
        const countProduct = await Product.countDocuments(find);

        const objectPagination = paginationHelper(req, countProduct);
        // end pagination
    
    
        const products = await Product.find(find)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);
    
        // console.log(products);
    
        res.render("admin/pages/trash/index", {
            pageTitle: "Danh sách sản phẩm đã xóa",
            products: products,
            filterState: filterState,
            keyword: req.query.keyword,
            pagination: objectPagination
        })
    } catch (error) {
        console.error(error);
        res.redirect(`/${prefixAdmin}/trash-products`);
    }
}

//[PATCH] /admin/trash-products/back/:id
module.exports.backProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.updateOne({
            _id: id
        }, {
            deleted: false
        });    

        res.redirect("back");
    } catch (error) {
        console.error(error);
        res.redirect(`/${prefixAdmin}/trash-products`);
    }
}