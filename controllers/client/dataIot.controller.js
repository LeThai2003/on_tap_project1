const DataIot = require("../../models/dataIot.model");

module.exports.getData = async (req, res) => {
    try {

        console.log("hi");

        console.log(req.params);
        console.log(req.body);

        const temperature = 10;
        const humidity = 10;
        const light = 10;
        const soil_moisture = 10;

        const data = {
            temperature: temperature,
            humidity: humidity,
            light: light,
            soil_moisture: soil_moisture
        };
        await DataIot.save(data);

        res.status(200).json({
            code: 200,
            message: "Lưu thành công"
        })
            
    } catch (error) {
        console.log("Lỗi get data iot: " + error);
    }
}