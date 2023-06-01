const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    contentListService,
    createContentService,
    getContentService,
    updateContentService,
    deleteContentService,
    exportContentService,
  } = require("../services/content.service");
  
  const createContent = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await createContentService(params);
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
  
  const getContent = async (req, res) => {
    const params = req.body;
    params.id = req.query.id
    params.contentId = req?.query?.contentId;
    const result = await getContentService(params);
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
  
  const updateContent = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id
    params.contentId = req?.query?.contentId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateContentService(params);
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
  
  const contentList = async (req, res) => {
    const params = req?.query;
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    const result = await contentListService(params);
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
  
  const deleteContent = async (req, res) => {
    const params = req.body;
    params.contentId = req?.query?.contentId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteContentService(params);
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
  
  const exportContent = async (req, res) => {
    const params = {};
    const result = await exportContentService(res, params);
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
    createContent,
    getContent,
    updateContent,
    contentList,
    deleteContent,
    exportContent,
  };
  