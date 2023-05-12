const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  productListService,
  createProductService,
  getProductService,
  updateProductService,
  deleteProductService,
  exportProductService,
} = require("../services/product.service");

const createProduct = async (req, res) => {
  const params = req.body;
  params.createdBy = req?.user?._id?.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await createProductService(params);
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

const getProduct = async (req, res) => {
  const params = req.body;
  params.productId = req?.query?.productId;
  const result = await getProductService(params);
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

const updateProduct = async (req, res) => {
  const params = req.body;
  params.productId = req?.query?.productId;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await updateProductService(params);
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

const productList = async (req, res) => {
  const params = req?.query;
  if(!params.limit) params.limit =10
  if(!params.page) params.page =1
  const result = await productListService(params);
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

const deleteProduct = async (req, res) => {
  const params = req.body;
  params.productId = req?.query?.productId;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await deleteProductService(params);
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

const exportProduct = async (req, res) => {
  const params = {};
  const result = await exportProductService(res, params);
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
  createProduct,
  getProduct,
  updateProduct,
  productList,
  deleteProduct,
  exportProduct,
};
