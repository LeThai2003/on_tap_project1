const DataIot = require("../../models/dataIot.model");

module.exports.getData = async (req, res) => {
    try {
        console.log(req.query);

        const temperature = parseFloat(req.query.Temperature) || 10;
        const humidity = parseFloat(req.query.Humidity) || 10;
        const light = parseFloat(req.query.Light) || 10;
        const soil_moisture = parseFloat(req.query.SoilHumidity) || 10;

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
        res.status(400).json({
            code: 400,
            message: error
        })
    }
}