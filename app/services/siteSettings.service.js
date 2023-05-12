const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { SiteSettings } = require("../models/siteSettings");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getSiteSettingsList } = require("./list.service");
const createSiteSettingsService = async (params) => {
  var newvalues = params;
  const resp = await SiteSettings.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: resp
  };
};
const getSiteSettingsService = async (params) => {
  const resp = await SiteSettings.findOne({});
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const updateSiteSettingsService = async (params) => {
  var newvalues = {
    $set: params,
  };
  const resp = await SiteSettings.updateOne({}, newvalues);
  if (!resp.modifiedCount) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
      message: messages?.somethingWrong,
      data: [],
    };
  }
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.updated,
    data: [],
  };
};

module.exports = {
  createSiteSettingsService,
  getSiteSettingsService,
  updateSiteSettingsService
};
