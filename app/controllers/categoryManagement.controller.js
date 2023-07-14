const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  categoryListService,
  createCategoryService,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
  exportCategoryService,
} = require("../services/category.service");

const createCategory = async (req, res) => {
  const params = req.body;
  params.createdBy = req?.user?._id?.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await createCategoryService(params);
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

const getCategory = async (req, res) => {
  const params = req.body;
  params.id = req.query.id;
  params.categoryId = req?.query?.categoryId;
  params.type = req?.query?.type;
  const result = await getCategoryService(params);
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

const updateCategory = async (req, res) => {
  const params = req.body;
  params.id = req?.query?.id;
  params.categoryId = req?.query?.categoryId;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await updateCategoryService(params);
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

const categoryList = async (req, res) => {
  const params = req?.query;
  if (!params.limit) params.limit = 10;
  if (!params.page) params.page = 1;
  const result = await categoryListService(params);
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

const deleteCategory = async (req, res) => {
  const params = req.body;
  params.categoryId = req?.query?.categoryId;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await deleteCategoryService(params);
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

const exportCategory = async (req, res) => {
  const params = {};
  const result = await exportCategoryService(res, params);
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
  createCategory,
  getCategory,
  updateCategory,
  categoryList,
  deleteCategory,
  exportCategory,
};
