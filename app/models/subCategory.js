const mongoose = require("mongoose");
const {InternalServices} = require('../apiServices/index')

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryId: {
      type: String
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

subCategorySchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "subCategory" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "subCategory" });
  doc.subCategoryId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

const SubCategory = mongoose.model("subCategory", subCategorySchema);
module.exports = { SubCategory };
