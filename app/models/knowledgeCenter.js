const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Schema = mongoose.Schema;

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');
const {InternalServices} = require('../apiServices/index')

const { getImageURL } = require("../utils/s3Utils")

const courseDetailsListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    hrs: {
      type: Number,
      trim: true,
    },
    min: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    
  }
)


const courseDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    hrs: {
      type: Number,
      trim: true,
    },
    min: {
      type: Number,
      trim: true,
    },
    list: [courseDetailsListSchema]
  }
)


const knowledgeCenterSchema = new mongoose.Schema(
  {
    knowledgeCenterId: {
      type: String
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    fileOriginalName: {
      type: String,
      required: false,
    },
    fileImageOriginalName: {
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

    thumbnail: {
      type: String,
      required: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    categorySlug: {
      type: String,
      required: false,
    },
    courseType: {
      type: String,
      required: false,
    },
    courseDetails: [courseDetailsSchema],
    subCategory: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    totalHrs: {
      type: Number,
      trim: true,
      
    },
    totalMin: {
      type: Number,
      trim: true,
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
    toObject: { getters: true },
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);
knowledgeCenterSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "knowledgeCenter" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "knowledgeCenter" });
  doc.knowledgeCenterId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

knowledgeCenterSchema.plugin(mongooseLeanVirtuals);
knowledgeCenterSchema.plugin(mongooseLeanGetters);
knowledgeCenterSchema.virtual('documentPathS3').get(function () {
  return this.documentPath ? getImageURL(this.documentPath) : null;
});
knowledgeCenterSchema.virtual('thumbnailS3').get(function () {
  return this.thumbnail ? getImageURL(this.thumbnail) : null;
});
const KnowledgeCenter = mongoose.model("knowledgeCenter", knowledgeCenterSchema);
module.exports = { KnowledgeCenter };
