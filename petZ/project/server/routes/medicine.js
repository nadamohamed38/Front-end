import express from 'express';
import { Medicine } from '../models/medicine.js';

import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/pet drugs'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const medicine = await Medicine.find();
    return res.status(200).json(medicine);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});




router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { name, describtion, pet_type,price  } = req.body;
    const img = {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    };

    const newPet = new Medicine({ name, img, describtion, pet_type,price  });
    await newPet.save();

    // Optional: remove file after reading
    fs.unlinkSync(req.file.path);

    return res.status(201).json({ message: ' created', medicine: newPet });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Serve image by pet ID
router.get('/img/:id', async (req, res) => {
  try {
    const pet = await Medicine.findById(req.params.id);
    if (!pet || !pet.img || !pet.img.data) {
      return res.status(404).send('medicine not found');
    }
    res.contentType(pet.img.contentType);
    res.send(pet.img.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});




router.delete('/:id', async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL parameter

  try {
    // Find and delete the user by their ID
    const deletedUser = await Medicine.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'medicine not found' }); // If the user doesn't exist
    }

    // Send a response with a success message
    return res.status(200).json({ message: 'medicine deleted successfully', medicine: deletedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // In case of any error
  }
});

export default router;

