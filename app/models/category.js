const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index')

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String
    },
    name: {
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

categorySchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "category" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "category" });
  doc.categoryId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

const Category = mongoose.model("category", categorySchema);
module.exports = { Category };
