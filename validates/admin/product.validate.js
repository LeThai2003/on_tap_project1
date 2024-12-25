module.exports.createProduct = (req, res, next) => {

    if(!req.body.title.trim())
    {
        req.flash("error","Tiêu đề không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}