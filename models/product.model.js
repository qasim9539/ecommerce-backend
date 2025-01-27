import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      default: null, // Fix spelling: "default" instead of "defualt"
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        userId: { type: mongoose.Schema.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    averageRating: {
      type: Number,
      default: 0, // Will calculate and update based on reviews
    },
  },
  {
    timestamps: true,
  }
);

// Create a text index on name and description
productSchema.index(
  {
    name: "text",
    description: "text",
  },
  {
    weights: { name: 10, description: 5 },
  }
);

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
