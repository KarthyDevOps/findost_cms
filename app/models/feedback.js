const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Schema = mongoose.Schema;
const feedbackSchema = new mongoose.Schema(
  {
    feedbackId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => {
        const now = Date.now().toString();
        return now.slice(0, 3) + now.slice(10, 13);
      },
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
const Feedback = mongoose.model("feedback", feedbackSchema);
module.exports = { Feedback };
