const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema(
  {
    subCategoryId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => {
        const now = Date.now().toString();
        return now.slice(0, 3) + now.slice(10, 13);
      },
    },
    name: {
      type: String,
      required: true,
    },
    categoryId: {
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
  },
  {
    timestamps: true,
  }
);
const SubCategory = mongoose.model("subCategory", subCategorySchema);
module.exports = { SubCategory };
