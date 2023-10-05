const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const {InternalServices} = require('../apiServices/index')
const faqSchema = new mongoose.Schema(
  {
    faqId: {
      type: String
    },
    title: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: false,
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
faqSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "faq" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "faq" });
  doc.faqId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});
const Faq = mongoose.model("faq", faqSchema);
module.exports = { Faq };
