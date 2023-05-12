const mongoose = require("mongoose");
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
  }
);
const SiteSettings = mongoose.model("siteSettings", siteSettingsSchema);
module.exports = { SiteSettings };
