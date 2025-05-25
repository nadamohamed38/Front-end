import express from 'express';
import { Book } from '../models/book.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const book = await Book.find();
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.find({ vet_id: id });
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {

  try {
    const { vet_id,appointment,user_id  } = req.body;

    const newUser = new Book({ vet_id,appointment,user_id });
    await newUser.save();

    return res.status(201).json({ message: 'created', book: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL parameter

  try {
    // Find and delete the user by their ID
    const deletedUser = await Book.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: ' not found' }); // If the user doesn't exist
    }

    // Send a response with a success message
    return res.status(200).json({ message: 'deleted successfully', book: deletedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // In case of any error
  }
});


export default router;

