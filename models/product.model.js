const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    slug: { 
        type: String, 
        slug: ["title"], 
        unique: true 
    },
    description: String,
    category: String,
    price: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    discountPercentage: Number,
    deletedAt: Date
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

