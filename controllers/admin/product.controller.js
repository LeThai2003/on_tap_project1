//[GET] /admin/product
module.exports.index = (req, res) => {
    res.render("admin/pages/product/index", {
        pageTitle: "Danh sách sản phẩm"
    })
}