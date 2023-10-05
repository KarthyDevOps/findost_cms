const mongoose = require("mongoose");

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');
const { getImageURL } = require("../utils/s3Utils")

const siteSettingsSchema = new mongoose.Schema(
  {
    siteUrl: {
      type: String,
      required: true,
    },
    supportNumber: {
      type: String,
      required: true,
    },
    supportEmail: {
      type: String,
      required: false,
    },
    sitelogo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    siteFavIcon: {
      type: String,
      required: false,
    },
    copyrightsText: {
      type: String,
      required: false,
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

siteSettingsSchema.plugin(mongooseLeanVirtuals);
siteSettingsSchema.plugin(mongooseLeanGetters);


siteSettingsSchema.virtual('sitelogoS3').get(function () {
  return this.sitelogo ? getImageURL(this.sitelogo) : null;
});
siteSettingsSchema.virtual('siteFavIconS3').get(function () {
  return this.siteFavIcon ? getImageURL(this.siteFavIcon) : null;
})
const SiteSettings = mongoose.model("siteSettings", siteSettingsSchema);
module.exports = { SiteSettings };
