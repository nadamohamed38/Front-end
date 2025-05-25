import express from 'express';
import { Vet } from '../models/vet.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const vet = await Vet.find();
    return res.status(200).json(vet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {

  try {
    const { name, email, password, price } = req.body;

    const newUser = new Vet({ name, email, password, price });
    await newUser.save();

    return res.status(201).json({ message: 'vet created', vet: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL parameter

  try {
    // Find and delete the user by their ID
    const deletedUser = await Vet.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'vet not found' }); // If the user doesn't exist
    }

    // Send a response with a success message
    return res.status(200).json({ message: 'vet deleted successfully', vet: deletedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // In case of any error
  }
});

export default router;

