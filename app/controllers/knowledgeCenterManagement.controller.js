const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    knowledgeCenterListService,
    createKnowledgeCenterService,
    getKnowledgeCenterService,
    updateKnowledgeCenterService,
    deleteKnowledgeCenterService,
    exportKnowledgeCenterService,
  } = require("../services/knowledgeCenter.service");
  
  const createKnowledgeCenter = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await createKnowledgeCenterService(params);
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
  
  const getKnowledgeCenter = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    const result = await getKnowledgeCenterService(params);
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
  
  const updateKnowledgeCenter = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateKnowledgeCenterService(params);
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
  
  const knowledgeCenterList = async (req, res) => {
    const params = req?.query;
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    params.limit = parseInt(params?.limit);
    params.page = parseInt(params?.page);
    if(req?.user?.userType =="AP")
      params.apId = req?.user?.apId;
    console.log("req", params);
    const result = await knowledgeCenterListService(params);
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
  
  const deleteKnowledgeCenter = async (req, res) => {
    const params = req.body;
    if (req.query.id) {
      params.id = req?.query?.id;
    }
    params.ids = req.body.ids;
 
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteKnowledgeCenterService(params);
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
  
  const exportKnowledgeCenter = async (req, res) => {
    const params = {};
    const result = await exportKnowledgeCenterService(res, params);
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
    createKnowledgeCenter,
    getKnowledgeCenter,
    updateKnowledgeCenter,
    knowledgeCenterList,
    deleteKnowledgeCenter,
    exportKnowledgeCenter,
  };
  