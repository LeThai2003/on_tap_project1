const { prefixAdmin } = require("../../configs/system");
const { filterStatus } = require("../../helpers/filterStatus.helper");
const Product = require("../../models/product.model");

//[GET] /admin/product
module.exports.index = async (req, res) => {
    try {
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
    
    
        // pagination
        const objectPagination = {
            currentPage: 1,
            limitItems: 4
        }
    
        if(req.query.page)
        {
            objectPagination.currentPage = parseInt(req.query.page);
        }
    
        const countProduct = await Product.countDocuments(find);
    
        objectPagination.totalPage = Math.ceil(countProduct / objectPagination.limitItems);
    
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
        // end pagination
    
    
        const products = await Product.find(find)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);
    
        // console.log(products);
    
        res.render("admin/pages/product/index", {
            pageTitle: "Danh sách sản phẩm",
            products: products,
            filterState: filterState,
            keyword: req.query.keyword,
            pagination: objectPagination
        })
    } catch (error) {
        console.error(error);
        res.redirect(`/${prefixAdmin}/products`);
    }
}