const mongoose = require("mongoose")
const dataIotSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    light: Number,
    soil_moisture: Number,
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const DataIot = mongoose.model("DataIot", productSchema, "data_iot");

module.exports = DataIot;
