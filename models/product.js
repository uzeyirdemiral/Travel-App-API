const mongoose = require("mongoose");


const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});


const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  distance: {
    type: String,
  },
  weather: {
    type: String,
  },
  price: {
    type: Number,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    // type: mongoose.Schema.Types.ObjectId, id yi alır 
    // ref: "Category",
    type:String,
    required:true
  },
  latitude:{
    type:Number,
    // required:true
  },
  longitude:{
    type:Number,
    // required:true
  },
  features:[featureSchema]
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
