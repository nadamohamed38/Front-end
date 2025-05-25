import express from 'express';
import { Store } from '../models/store.js';

import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/supplies'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });




router.get('/', async (req, res) => {
  try {
    const store = await Store.find();
    return res.status(200).json(store);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:_id', async (req, res) => {
  try {
    const store = await Store.findById(req.params._id);
    if (!store) {
      return res.status(404).send('product not found');
    }
    return res.status(200).json(store);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { name, amount, cost} = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const img = `http://localhost:5000/uploads/supplies/${req.file.filename}`;
    
    const newPet = new Store({ name,amount: Number(amount),
      cost: Number(cost), img });
    await newPet.save();

    // Optional: remove file from disk if storing only in DB
    // fs.unlinkSync(req.file.path);

    return res.status(201).json({ message: 'Product  Added', pet: newPet });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Store.findByIdAndUpdate(
      req.params.id,            // The document ID
      { $set: { amount: req.body.amount } }, // Field to update
      { new: true }             // Return the updated document
    );

    if (!updated) {
      return res.status(404).json({ error: ' not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const productId = req.params.id; // Get the user ID from the URL parameter

  try {
    // Find and delete the user by their ID
    const deletedUser = await Store.findByIdAndDelete(productId);

    if (!deletedUser) {
      return res.status(404).json({ error: ' not found' }); // If the user doesn't exist
    }

    // Send a response with a success message
    return res.status(200).json({ message: 'deleted successfully', user: deletedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // In case of any error
  }
});

export default router;

