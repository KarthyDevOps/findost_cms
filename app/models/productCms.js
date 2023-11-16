const mongoose = require("mongoose");
const { InternalServices } = require("../apiServices/index");

const { getImageURL } = require("../utils/s3Utils");

const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const mongooseLeanGetters = require("mongoose-lean-getters");

const productCmsSchema = new mongoose.Schema(
  {
    productCmsId: {
      type: String,
    },
    productType: {
      type: String,
      enum: [
        "goldBond",
        "insurance",
        "fixedIncome",
        "loan",
        "pms",
        "portfolio",
        "algoTrading",
      ],
      required: true,
    },
    schemeName: {
      type: String,
    },
    icon: {
      type: String,
      required: false,
    },
    subscriptionFrom: {
      type: String,
    },
    subscriptionTo: {
      type: String,
    },
    status: {
      type: String,
    },
    price: {
      type: String,
    },
    maxLimit: {
      type: String,
    },
    dateOfIssue: {
      type: String,
    },
    planType: {
      type: String,
    },
    companyName: {
      type: String,
    },
    insuranceType: {
      type: String,
    },
    insurancePlan: {
      type: String,
    },
    lifeCover: {
      type: String,
    },
    claimSettle: {
      type: String,
    },
    coverUpto: {
      type: String,
    },

    aboutUs: {
      type: String,
    },
    keyFuture: {
      type: String,
    },
    otherBenefits: {
      type: String,
    },
    policyDoesNotCover: {
      type: String,
    },
    policyDoc: {
      type: String,
    },
    rateOfInterest: {
      type: String,
    },
    description: {
      type: String,
    },
    reference: {
      type: Array,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    brochure: {
      type: String,
    },
    brochureFileType: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
productCmsSchema.plugin(mongooseLeanVirtuals);

productCmsSchema.plugin(mongooseLeanGetters);

productCmsSchema.virtual("iconS3").get(function () {
  return this.icon ? getImageURL(this.icon) : null;
});

productCmsSchema.virtual("imageS3").get(function () {
  return this.image ? getImageURL(this.image) : null;
});

productCmsSchema.virtual("brochureS3").get(function () {
  return this.brochure ? getImageURL(this.brochure) : null;
});

productCmsSchema.pre("save", async function (next) {
  InternalServices.getSequenceId({ type: "productCms" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "productCms" });

  doc.productCmsId = (counter?.data?.count + 1)
    .toString()
    .padStart(6, "0")
    .toString();
  next();
});

const productCms = mongoose.model("productCms", productCmsSchema);

module.exports = { productCms };
