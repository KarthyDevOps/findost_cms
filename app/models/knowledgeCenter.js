const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Schema = mongoose.Schema;
const knowledgeCenterSchema = new mongoose.Schema(
  {
    knowledgeCenterId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => {
        const now = Date.now().toString();
        return now.slice(0, 3) + now.slice(10, 13);
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    contentUrlLink: {
        type: String,
        required: false,
      },
      documentPath: {
        type: String,
        required: false,
      },
    category: {
      type: String, 
      required: true,
    },
    subCategory: {
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
const KnowledgeCenter = mongoose.model("knowledgeCenter", knowledgeCenterSchema);
module.exports = { KnowledgeCenter };
