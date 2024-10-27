const Product = require("../../models/product.model");

//[GET] /admin/product
module.exports.index = async (req, res) => {
    const filterState = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    const find = {
        deleted: false,
    };

    if(req.query["status"])
    {
        find["status"] = req.query["status"];
        const index = filterState.findIndex(item => item.status === req.query.status);
        filterState[index].class = "active";
    }
    else
    {
        filterState[0].class = "active";
    }

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