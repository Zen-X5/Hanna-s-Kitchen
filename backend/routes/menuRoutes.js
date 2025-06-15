const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const MenuItem = require('../models/MenuItem');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// POST /api/items - with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, tags } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newItem = new MenuItem({
      name,
      price,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      imageUrl,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

module.exports = router;
