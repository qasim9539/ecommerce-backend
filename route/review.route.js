import { Router } from 'express';
import auth from '../middleware/auth.js';
import { addReviewController, getReviewsByProductController } from '../controllers/review.controller.js';

const reviewRouter = Router();

// Add a review for a delivered product
reviewRouter.post('/add', auth, addReviewController);

// Get reviews for a specific product
reviewRouter.get('/product/:productId', getReviewsByProductController);

export default reviewRouter;

