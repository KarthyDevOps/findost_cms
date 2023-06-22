const mongoose = require("mongoose");

const {InternalServices} = require('../apiServices/index')

const feedbackSchema = new mongoose.Schema(
  {
    feedbackId: {
      type: String
    },
    userId: {
      type: String,
      trim: true,
      default:null
    },
    userName: {
      type: String,
      trim: true,
      default:null
    },
    feedback: {
      type: String,
      required: false,
    },
    feedbackAnswer: {
      type: String,
      trim:true
    },
    status: {
      type: String,
      default: "Open"
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

feedbackSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "feedback" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "feedback" });
  doc.feedbackId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});
const Feedback = mongoose.model("feedback", feedbackSchema);
module.exports = { Feedback };
