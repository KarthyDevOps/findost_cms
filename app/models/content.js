const mongoose = require("mongoose");

const { InternalServices } = require('../apiServices/index')

const contentSchema = new mongoose.Schema(
  {
    contentId: {
      type: String
    },
    title: {
      type: String,
      required: true,
    },
    description: {
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
contentSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "content" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "content" });
  doc.contentId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});
const Content = mongoose.model("content", contentSchema);
module.exports = { Content };
