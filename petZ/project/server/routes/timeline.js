import express from 'express';
import { Timeline } from '../models/timeline.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/posts'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });



router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { caption , t,name} = req.body;
    let img = null
    if (req.file) {    
        img = `http://localhost:5000/uploads/posts/${req.file.filename}`;
    }

    const newPet = new Timeline({ caption , img ,t,name});
    await newPet.save();

    // Optional: remove file from disk if storing only in DB
    // fs.unlinkSync(req.file.path);

    return res.status(201).json({ message: 'Post created', pet: newPet });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});



router.get('/', async (req, res) => {
  try {
    const pets = await Timeline.find();
    return res.status(200).json(pets);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL parameter

  try {
    // Find and delete the user by their ID
    const deletedUser = await Timeline.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'not found' }); // If the user doesn't exist
    }

    // Send a response with a success message
    return res.status(200).json({ message: 'deleted successfully', Pet: deletedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // In case of any error
  }
});

export default router;

