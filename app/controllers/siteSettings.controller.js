const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    createSiteSettingsService,
    getSiteSettingsService,
    updateSiteSettingsService,
  } = require("../services/siteSettings.service");
  
  const createSiteSettings = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await createSiteSettingsService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  };
  
  const getSiteSettings = async (req, res) => {
    const params = req.body;
    params.siteSettingsId = req?.query?.siteSettingsId;
    const result = await getSiteSettingsService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  };
  
  const updateSiteSettings = async (req, res) => {
    const params = req.body;
    params.siteSettingsId = req?.query?.siteSettingsId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateSiteSettingsService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  };
  
  const siteSettingsList = async (req, res) => {
    const params = req?.query;
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    const result = await siteSettingsListService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  };
  
  module.exports = {
    createSiteSettings,
    getSiteSettings,
    updateSiteSettings,
    siteSettingsList
  };
  