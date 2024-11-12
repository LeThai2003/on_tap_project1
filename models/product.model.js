const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: String,
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
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

