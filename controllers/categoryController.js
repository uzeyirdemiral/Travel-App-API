const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const imageUrl = req.file ? req.file.path.split("\\").pop() : "";

  try {
    const category = new Category({ name, imageUrl });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  // console.log(categoryId);

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "kategori bulunamadı" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.categoryUpdate = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  let imageUrl = "";

  if (req.file) {
    imageUrl = req.file.path.split("\\").pop();
  }

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "kategori bulunamadı" });
    }

    category.name = name || category.name;
    category.imageUrl = imageUrl || category.imageUrl;

    const updatedCategory = await category.save();
    res.status(200).json({ message: "başarılı", updatedCategory });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: "kategori bulunamadı" });
    }
    res.status(200).json({ message: "kategori başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

