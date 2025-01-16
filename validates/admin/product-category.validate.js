module.exports.createProductCategory = (req, res, next) => {

    if(!req.body.title.trim())
    {
        req.flash("error","Tiêu đề không được bỏ tróng!");
        res.redirect("back");
        return;
    }

    next()
}