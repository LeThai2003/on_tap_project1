const DataIot = require("../../models/dataIot.model");

module.exports.getData = async (req, res) => {
    try {
        console.log(req.params);

        const temperature = req.params.temperature || 10;
        const humidity = req.params.humidity || 10;
        const light = req.params.light || 10;
        const soil_moisture = req.params.soil_moisture || 10;

        const data = new DataIot({
            temperature: temperature,
            humidity: humidity,
            light: light,
            soil_moisture: soil_moisture
        });
        await data.save();

        res.status(200).json({
            code: 200,
            message: "Lưu thành công"
        })
            
    } catch (error) {
        console.log("Lỗi get data iot: " + error);
    }
}