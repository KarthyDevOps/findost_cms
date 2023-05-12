const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const subProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    trim: true,
    ref: "product",
  },
  productName: {
    type: String,
    trim: true,
  },
  productMappedDetais: {
    type: String,
    trim: true,
  },
  startDate: {
    type: String,
    trim: true,
  },
  endDate: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
});
const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => {
        const now = Date.now().toString();
        return now.slice(0, 3) + now.slice(10, 13);
      },
    },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: false,
    },
    productPlan: {
      type: String,
      required: true,
    },
    subProduct: subProductSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", productSchema);
module.exports = { Product };
