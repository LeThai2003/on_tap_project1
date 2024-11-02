const { prefixAdmin } = require("../../configs/system");
const { filterStatus } = require("../../helpers/filterStatus.helper");
const { paginationHelper } = require("../../helpers/pagination.helper");
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
        const countProduct = await Product.countDocuments(find);

        const objectPagination = paginationHelper(req, countProduct, 4);
        // end pagination
    
    
        const products = await Product.find(find)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip)
            .sort({
                position:"desc"
            });
    
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


// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;

        await Product.updateOne({
            _id: id
        }, {
            status: status
        })

        res.redirect(`back`);
    } catch (error) {
        console.error(error);
        res.redirect(`/${prefixAdmin}/products`);
    }
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const ids = req.body.ids.split(", ");
        const type = req.body.type;
        
        switch (type) {
            case "active":
            case "inactive":
                await Product.updateMany({
                    _id: {$in: ids}
                }, {
                    status: type
                })
                break;
            case "delete-all":
                await Product.updateMany({
                    _id: {$in: ids}
                }, {
                    deleted: true,
                    deletedAt: new Date()
                })
                break;
            case "change-position":
                // console.log(ids);
                for (const item of ids) {
                    const [id, position] = item.split("-");
                    await Product.updateOne({
                        _id: id
                    }, {
                        position: parseInt(position)
                    });
                }
                break;
            default:
                break;
        }
        

        res.redirect(`back`);
    } catch (error) {
        console.error(error);
        res.redirect(`/${prefixAdmin}/products`);
    }
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;

        await Product.updateOne({
            _id: id
        }, {
            status: status
        })

        res.redirect(`back`);
    } catch (error) {
        console.error(error);
        res.redirect(`/${prefixAdmin}/products`);
    }
}

// [DELETE] /admin/delete/:id
module.exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        await Product.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date()
        });
        
        res.redirect(`back`);
    } catch (error) {
        console.error(error);
        res.redirect(`/${prefixAdmin}/products`);
    }
}