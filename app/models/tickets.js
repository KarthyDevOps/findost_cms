const mongoose = require("mongoose");
const ticketsSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      trim: true,
    },
    priorityScore: {
      type: String,
      trim: true,
    },
    customerEmailId: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    issueDescription: {
      type: String,
      trim: true,
    },
    attachmentExtension: {
      type: String,
      trim: true,
    },
    attachment: {
      type: String,
      trim: true,
    },
    userID: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Tickets = mongoose.model("tickets", ticketsSchema);
module.exports = { Tickets };
