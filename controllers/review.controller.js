// import Review from "../models/review.model.js";
// import ProductModel from "../models/product.model.js";
// import mongoose from "mongoose";

// // Create a review for a product
// export const createReview = async (req, res) => {
//   const { productId, rating, comment } = req.body;
//   const userId = req.userId;

//   try {
//     const review = new Review({
//       productId,
//       userId,
//       rating,
//       comment,
//     });

//     await review.save();

//     // Update the product's rating summary after a new review is added
//     await updateProductRatingsSummary(productId);

//     return res.json({
//       success: true,
//       message: "Review added successfully!",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get all reviews for a product
// // export const getReviews = async (req, res) => {
// //   const { productId } = req.params;

// //   // Check if the productId is a valid 24-character hex string
// //   if (!mongoose.Types.ObjectId.isValid(productId)) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid productId format.',
// //     });
// //   }

// //   try {
// //     // Ensure productId is an ObjectId (use 'new' keyword)
// //     const productObjectId = new mongoose.Types.ObjectId(productId);

// //     // Query reviews based on productId
// //     const reviews = await Review.find({ productId: productObjectId }).populate('userId', 'name');

// //     return res.json({
// //       success: true,
// //       data: reviews,
// //     });
// //   } catch (error) {

// //     console.error(error);
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// export const getReviews = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     // Log the received productId for debugging purposes
//     console.log("Received productId:", productId);

//     // Ensure the productId is a valid ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid productId format.",
//       });
//     }

//     // Query to get all reviews for the product, populate user information (name)
//     const reviews = await Review.find({ productId })
//       .populate("userId", "name") // Populate userId with only 'name' field
//       .sort({ createdAt: -1 }); // Optionally sort reviews by date

//     // Check if reviews are found for the product
//     if (reviews.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No reviews found for this product.",
//       });
//     }

//     return res.json({
//       success: true,
//       data: reviews,
//     });
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get rating summary for a product (average rating, total ratings)
// export const getProductRatingsSummary = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const reviews = await Review.find({ productId });
//     const totalRatings = reviews.length;

//     const averageRating = totalRatings
//       ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
//       : 0;

//     return res.json({
//       success: true,
//       data: { averageRating, totalRatings },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Helper function to update product's rating summary
// const updateProductRatingsSummary = async (productId) => {
//   const reviews = await Review.find({ productId });
//   const totalRatings = reviews.length;

//   const averageRating = totalRatings
//     ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
//     : 0;

//   await ProductModel.updateOne(
//     { _id: productId },
//     { rating: averageRating, totalRatings }
//   );
// };





























import Review from '../models/review.model.js';
import OrderModel from '../models/order.model.js';
import ProductModel from '../models/product.model.js';

// Add a review
// export const addReviewController = async (req, res) => {
//   try {
    

//     const {productId, rating, comment } = req.body;
//     const userId = req.userId;

//     // Verify if the product was delivered to the user
//     const order = await OrderModel.findOne({ userId, productId, status: 'Delivered' });
//     if (!order) {
//       return res.status(400).json({ success: false, message: 'Product not delivered or order not found.' });
//     }

//     // Add the review
//     const review = new Review({
//       productId,
//       userId,
//       rating,
//       comment,
//     });

//     await review.save();
//     res.status(201).json({ success: true, message: 'Review added successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to add review.', error });
//   }
// };






export const addReviewController = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;

    console.log('Received:', productId, rating, comment, userId);

    // Verify if the product was delivered to the user
    const order = await OrderModel.findOne({ userId, productId, status: 'Delivered' });
    if (!order) {
      return res.status(400).json({ success: false, message: 'Product not delivered or order not found.' });
    }

    // Add the review
    const review = new Review({
      productId,
      userId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ success: true, message: 'Review added successfully.' });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: 'Failed to add review.', error });
  }
};

// Get all reviews for a product
export const getReviewsByProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).populate('userId', 'name email');
    if (!reviews.length) {
      return res.status(404).json({ success: false, message: 'No reviews found for this product.' });
    }

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.', error });
  }
};
