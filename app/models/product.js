const mongoose = require("mongoose");
var Schema = mongoose.Schema;
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
    productIcon: {
      type: String,
      required: false,
    },
    productType: {
      type: String,
      required: true,
    },
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
