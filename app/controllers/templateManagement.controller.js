const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    templateListService,
    createTemplateService,
    getTemplateService,
    updateTemplateService,
    deleteTemplateService,
    exportTemplateService,
  } = require("../services/template.service");
  
  const createTemplate = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await createTemplateService(params);
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
  
  const getTemplate = async (req, res) => {
    const params = req.body;
    params.templateId = req?.query?.templateId;
    const result = await getTemplateService(params);
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
  
  const updateTemplate = async (req, res) => {
    const params = req.body;
    params.templateId = req?.query?.templateId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateTemplateService(params);
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
  
  const templateList = async (req, res) => {
    const params = req?.query;
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    const result = await templateListService(params);
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
  
  const deleteTemplate = async (req, res) => {
    const params = req.body;
    params.templateId = req?.query?.templateId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteTemplateService(params);
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
  
  // export related api's
  
  const exportTemplate = async (req, res) => {
    const params = {};
    const result = await exportTemplateService(res, params);
    return result;
    // if (!result.status) {
    //   return sendErrorResponse(
    //     req,
    //     res,
    //     result.statusCode,
    //     result.message,
    //     result.data
    //   );
    // }
    // return sendSuccessResponse(
    //   req,
    //   res,
    //   result.statusCode,
    //   result.message,
    //   result.data
    // );
  };
  
  module.exports = {
    createTemplate,
    getTemplate,
    updateTemplate,
    templateList,
    deleteTemplate,
    exportTemplate,
  };
  