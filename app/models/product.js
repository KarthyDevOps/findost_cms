const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { Sequence } = require('./sequence')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');
const { getImageURL } = require("../utils/s3Utils")

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
  var doc = this;
  let counter = await Sequence.findOneAndUpdate({ type: 'product' }, { $inc: { count: 1 } })
  doc.productId = (counter.count + 1).toString().padStart(6, '0').toString();;
  next();

});

productSchema.plugin(mongooseLeanVirtuals);
productSchema.plugin(mongooseLeanGetters);


productSchema.virtual('productIconS3').get(function () {
  return this.productIcon ? getImageURL(this.productIcon) : null;
})

const Product = mongoose.model("product", productSchema);
module.exports = { Product };
