const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();
connectDb();

const port = process.env.PORT || 5001;
const host = process.env.HOST;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.get("/", (req, res) => {
  res.json({
    message: "hoş geldiniz",
  });
});

app.use("/api/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/auths", authRoutes);

//resimleri görüntüleme localhost:5000/uploads/image_uzantı
app.use("/uploads", express.static("uploads"));
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor...`);
});
