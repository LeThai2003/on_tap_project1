const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        slug: ["title"],
        unique: true
    },
    parentId: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
});

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "product_categories");

module.exports = ProductCategory;