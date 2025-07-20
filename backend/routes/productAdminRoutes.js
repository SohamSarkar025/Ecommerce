const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products (admin view)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/admin/products
// @desc Create a new product
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, description, price, category, image, countInStock } =
      req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      countInStock,
    });

    await product.save();
    res.status(201).json({ message: "Product Created", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/admin/products/:id
// @desc Update product info
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { name, description, price, category, image, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;

      const updated = await product.save();
      res.json({ message: "Product Updated", product: updated });
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/admin/products/:id
// @desc Delete a product
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.remove();
    res.json({ message: "Product Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
