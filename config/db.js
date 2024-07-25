const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
        family:4
    });
    console.log("Veritabanı bağlantısı başarılı");
  } catch (error) {
    console.error("Veritabanı bağlantısı hatası:", error);
  }
};

module.exports = connectDb;
