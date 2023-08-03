const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    subCategoryListService,
    createSubCategoryService,
    getSubCategoryService,
    updateSubCategoryService,
    deleteSubCategoryService,
    exportSubCategoryService,
  } = require("../services/subCategory.service");
  
  const createSubCategory = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await createSubCategoryService(params);
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
  
  const getSubCategory = async (req, res) => {
    const params = req.body;
    params.id = req.query.id
    params.subCategoryId = req?.query?.subCategoryId;
    const result = await getSubCategoryService(params);
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
  
  const updateSubCategory = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id
    params.subCategoryId = req?.query?.subCategoryId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateSubCategoryService(params);
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
  
  const subCategoryList = async (req, res) => {
    const params = req?.query;
    if(params.returnAll && params.returnAll.toLowerCase() == "true") params.returnAll = true
    console.log('params-->', params)
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    const result = await subCategoryListService(params);
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
  
  const deleteSubCategory = async (req, res) => {
    const params = req.body;
    params.subCategoryId = req?.query?.subCategoryId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteSubCategoryService(params);
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
  
  const exportSubCategory = async (req, res) => {
    const params = {};
    const result = await exportSubCategoryService(res, params);
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
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    subCategoryList,
    deleteSubCategory,
    exportSubCategory,
  };
  