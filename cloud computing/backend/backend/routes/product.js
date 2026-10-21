const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔥 AUTO SEED DATA (Backend start hotach products add hoil)
const seedData = [
  // Electronics
  { name: "Wireless Headphones", price: 1999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", category: "Electronics", rating: 4.5 },
  { name: "Smart Watch", price: 2499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "Electronics", rating: 4.3 },
  { name: "Gaming Mouse", price: 1299, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400", category: "Electronics", rating: 4.7 },
  
  // Fashion / Clothes
  { name: "Running Shoes", price: 1799, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "Fashion", rating: 4.6 },
  { name: "Denim Jacket", price: 2999, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400", category: "Fashion", rating: 4.4 },
  { name: "Summer Floral Dress", price: 1499, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", category: "Fashion", rating: 4.8 },
  { name: "Cotton T-Shirt", price: 599, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", category: "Fashion", rating: 4.2 },
  
  // Beauty
  { name: "Luxury Perfume", price: 3499, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400", category: "Beauty", rating: 4.9 },
  { name: "Matte Lipstick Set", price: 899, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", category: "Beauty", rating: 4.5 },
  { name: "Skincare Kit", price: 1299, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Beauty", rating: 4.7 },
  
  // Home Decor
  { name: "Scented Candles", price: 499, image: "https://images.unsplash.com/photo-1602874801006-e26e46ef3b5e?w=400", category: "Home Decor", rating: 4.6 },
  { name: "Modern Table Lamp", price: 1899, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", category: "Home Decor", rating: 4.4 },
  { name: "Ceramic Vase", price: 799, image: "https://images.unsplash.com/photo-1581783342308-f792ca4ac094?w=400", category: "Home Decor", rating: 4.3 },
  { name: "Throw Pillow Cover", price: 399, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400", category: "Home Decor", rating: 4.1 },
  
  // Accessories
  { name: "Backpack", price: 999, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", category: "Accessories", rating: 4.2 },
  { name: "Sunglasses", price: 799, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", category: "Accessories", rating: 4.4 }
];

router.get('/', async (req, res) => {
  try {
    let products = await Product.find();
    
    // Jar database rikami asel tar auto seed kar
    if (products.length === 0) {
      await Product.insertMany(seedData);
      products = await Product.find();
      console.log("🔥 Auto-seeded 16 products to DB!");
    }
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;