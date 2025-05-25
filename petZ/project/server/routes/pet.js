import express from 'express';
import { Pet } from '../models/pet.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/pets'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });



router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { name, age, type, user_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const img = `http://localhost:5000/uploads/pets/${req.file.filename}`;
    const newPet = new Pet({ name, age, type, user_id, img });
    await newPet.save();

    // Optional: remove file from disk if storing only in DB
    // fs.unlinkSync(req.file.path);

    return res.status(201).json({ message: 'Pet created', pet: newPet });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});



router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    return res.status(200).json(pets);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:_id', async (req, res) => {
  try {
    const user = await Pet.findById(req.params._id);
    if (!user) {
      return res.status(404).send('Pet not found');
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL parameter

  try {
    // Find and delete the user by their ID
    const deletedUser = await Pet.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' }); // If the user doesn't exist
    }

    // Send a response with a success message
    return res.status(200).json({ message: 'pet deleted successfully', Pet: deletedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // In case of any error
  }
});

export default router;

