const mongoose = require("mongoose")

module.exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Kết nối database")); //Để đảm bảo rằng console.log("Kết nối database") chỉ được thực thi khi kết nối thành công, bạn cần truyền vào .then() một hàm callback
}
