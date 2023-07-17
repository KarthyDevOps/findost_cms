const mongoose = require("mongoose");
const {InternalServices} = require('../apiServices/index')

const templateSchema = new mongoose.Schema(
  {
    templateId: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    templateType: {
      type: String,
      required: false,
    },
    categoryId: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imagePath: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
    },
    
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


templateSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "template" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "template" });
  doc.templateId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});
templateSchema.virtual('imagePathS3').get(function () {
  return this.imagePath ? getImageURL(this.imagePath) : null;
});

const Template = mongoose.model("template", templateSchema);
module.exports = { Template };
