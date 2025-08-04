import express from 'express';
import {
  getAllPacks,
  startPack,
  getDailyTasks,
  submitTaskResponse,
} from '../controllers/habitPackController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get all available pack templates
router.route('/').get(protect, getAllPacks);

// Route to get the user's current daily tasks
router.route('/daily-task').get(protect, getDailyTasks);

// Route to submit a response for a specific task
router.route('/submit-task').post(protect, submitTaskResponse);

// Route for a user to start a specific pack by its ID
router.route('/:id/start').post(protect, startPack);

export default router;
