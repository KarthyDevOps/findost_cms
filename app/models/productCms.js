const mongoose = require("mongoose");
const { InternalServices } = require("../apiServices/index");

const { getImageURL } = require("../utils/s3Utils");

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
    refference: {
      type: Array,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
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

productCmsSchema.virtual("iconS3").get(function () {
  return this.icon ? getImageURL(this.icon) : null;
});

productCmsSchema.virtual("imageS3").get(function () {
  return this.image ? getImageURL(this.image) : null;
});

const productCms = mongoose.model("productCms", productCmsSchema);
module.exports = { productCms };
