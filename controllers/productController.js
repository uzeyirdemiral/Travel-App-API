const axios = require("axios");
const Product = require("../models/product.js");
const Category = require("../models/category.js");
const { get } = require("mongoose");

exports.createProduct = async (req, res) => {
  const {
    title,
    duration,
    distance,
    price,
    shortDescription,
    longDescription,
    category,
    latitude,
    longitude,
  } = req.body;
  let features;
  try {
    features = JSON.parse(req.body.features);
  } catch (error) {
    return res.status(400).json({ message: "Geçersiz JSON formatı: features" });
  }

  // const features = JSON.parse(req.body.features);

  const imageUrl = req.file ? req.file.path.split("\\").pop() : "";

  const API_KEY = process.env.API_KEY
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  try {
    const categoryObject = await Category.findOne({ name: category });

    if (!categoryObject) {
      return res.status(404).json({ message: "kategori bulunamadı" });
    }

    const response = await axios.get(API_URL);
    const kelvinWeather = response.data.main.temp;
    const celsiusWeather = Math.floor(kelvinWeather - 273.15);
    const product = new Product({
      title,
      duration,
      distance,
      weather: celsiusWeather,
      price,
      shortDescription,
      longDescription,
      imageUrl,
      category: categoryObject.name,
      latitude,
      longitude,
      features,
    });

    const savedProduct = await product.save();
    if (!savedProduct) {
      return res.status(500).json({ message: "Ürün kaydedilemedi" });
    }

    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.gelAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);

    if (!productId) {
      return res.status(404).json({ message: "product bulunamadı" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const {
    title,
    duration,
    distance,
    weather,
    price,
    shortDescription,
    longDescription,
    category,
    features,
  } = req.body;
  let imageUrl = "";
  if (req.file) {
    imageUrl = req.file.path.split("\\").pop();
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "ürün bulunamadı" });
    }

    product.title = title || product.title;
    product.duration = duration || product.duration;
    product.distance = distance || product.distance;
    product.weather = weather || product.weather;
    product.price = price || product.price;
    product.shortDescription = shortDescription || product.shortDescription;
    product.longDescription = longDescription || product.longDescription;
    product.category = category || product.category;
    product.features = features || product.features;
    product.imageUrl = imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.status(200).json({ message: "başarılı", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "ürün bulunamadı" });
    }
    res.status(200).json({ message: "ürün başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
