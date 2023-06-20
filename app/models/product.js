const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');
const { getImageURL } = require("../utils/s3Utils")
const {InternalServices} = require('../apiServices/index')

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
    },
    productIcon: {
      type: String,
      required: false,
    },
    productType: {
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
    toObject: { getters: true },
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);


productSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "product" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "product" });
  doc.productId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

productSchema.plugin(mongooseLeanVirtuals);
productSchema.plugin(mongooseLeanGetters);


productSchema.virtual('productIconS3').get(function () {
  return this.productIcon ? getImageURL(this.productIcon) : null;
})

const Product = mongoose.model("product", productSchema);
module.exports = { Product };
