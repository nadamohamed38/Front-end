import express from 'express';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:_id', async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).send('user not found');
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST: Create a new user (MongoDB generates _id)
router.post('/', async (req, res) => {

  try {
    const { name, email, password, phone_number } = req.body;

    const newUser = new User({ name, email, password, phone_number });
    await newUser.save();

    return res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL parameter

  try {
    // Find and delete the user by their ID
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' }); // If the user doesn't exist
    }

    // Send a response with a success message
    return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // In case of any error
  }
});

export default router;

