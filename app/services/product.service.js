const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Product } = require("../models/product");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getProductList } = require("./list.service");
const createProductService = async (params) => {
  var newvalues = { 
    productName : params.productName,
    productPlan : params.productPlan,
    productDescription : params.productDescription,

    subProduct : {
      productName : params.subProductName,
      productMappedDetais: params.SubProductMappedDetails,
      startDate : params.SubProductDurationStartDate,
      endDate : params.SubProductDurationEndDate,
      city : params.subProductCity,
      country : params.subProductCountry,
    }
  };

  const resp = await Product.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};
const getProductService = async (params) => {
  var payload = {
    _id: params?.productId,
    isDeleted: false,
  };
  const resp = await Product.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const updateProductService = async (params) => {
  var payload = {
    _id: params?.productId,
    isDeleted: false
  };
  delete params["productId"];
  var newvalues = { 
    productName : params.productName,
    productPlan : params.productPlan,
    productDescription : params.productDescription,
    subProduct : {
      productName : params.subProductName,
      productMappedDetais: params.SubProductMappedDetails,
      startDate : params.SubProductDurationStartDate,
      endDate : params.SubProductDurationEndDate,
      city : params.subProductCity,
      country : params.subProductCountry,
    }
  };

  var newvalues = {
    $set: newvalues,
  };
  const resp = await Product.updateOne(payload, newvalues);
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
const productListService = async (params) => {
  params.all = true;
  const allList = await getProductList(params);
  params.all = params.returnAll ==true ? true : false;
  const result = await getProductList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};
const deleteProductService = async (params) => {
  var payload = {
    _id: params?.productId,
    isDeleted: false,
    
  };
  var newvalues = {
    $set: { isDeleted: true },
  };
  const resp = await Product.updateOne(payload, newvalues);
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
    message: messages?.deleted,
    data: [],
  };
};
module.exports = {
  createProductService,
  getProductService,
  updateProductService,
  productListService,
  deleteProductService,
};
