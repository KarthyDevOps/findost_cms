const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");

const {
  ProductCmsListService,
  createProductCmsService,
  getProductCmsService,
  updateProductCmsService,
  deleteProductCmsService,
} = require("../services/productCms.service");

const createProductCms = async (req, res) => {
  const params = req.body;
  params.createdBy = req?.user?._id?.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  if (req?.user?.userType == "ADMIN") {
    (params.userId = req?.user?.adminId), (params.userName = req?.user?.name);
  }
  const result = await createProductCmsService(params);
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

const getProductCms = async (req, res) => {
  const params = req.body;
  params.id = req?.query?.id;
  const result = await getProductCmsService(params);
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

const updateProductCms = async (req, res) => {
  const params = req.body;
  params.id = req?.query?.id;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await updateProductCmsService(params);
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

const productCmsList = async (req, res) => {
  const params = req?.query;
  if (!params.limit) params.limit = 10;
  if (!params.page) params.page = 1;
  const result = await ProductCmsListService(params);
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

const deleteProductCms = async (req, res) => {
  const params = req.body;
  if (req.query.id) {
    params.id = req?.query?.id;
  }
  params.ids = req.body.ids;

  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await deleteProductCmsService(params);
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
  createProductCms,
  getProductCms,
  updateProductCms,
  productCmsList,
  deleteProductCms,
};
