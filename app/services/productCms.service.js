const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { productCms } = require("../models/productCms");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getProductCmsList } = require("./list.service");

const createProductCmsService = async (params) => {
  var newvalues = params;
  const resp = await productCms.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp,
    },
  };
};
const getProductCmsService = async (params) => {
  var payload = {
    _id: params?.id,
    isDeleted: false,
  };
  const resp = await productCms.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const updateProductCmsService = async (params) => {
  var payload = {
    _id: params?.id,
    isDeleted: false
  };
  delete params["feedbackId"];
  var newvalues = {
    $set: params,
  };
  const resp = await productCms.updateOne(payload, newvalues);
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
const ProductCmsListService = async (params) => {
  params.all = true;
  const allList = await getProductCmsList(params);
  params.all = params.returnAll ==true ? true : false;
  const result = await getProductCmsList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};
const deleteProductCmsService = async (params) => {
  let ids = [];
  if (params.id) ids.push(params?.id);
  else if (params.ids) {
    ids = params.ids;
  }
  var newvalues = {
    $set: {
      isDeleted: true,
      updatedBy: params?.updatedBy,
      lastUpdatedBy: params?.lastUpdatedBy,
    },
  };
  const resp = await productCms.updateMany({_id:ids}, newvalues);
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
  createProductCmsService,
  getProductCmsService,
  updateProductCmsService,
  ProductCmsListService,
  deleteProductCmsService,
};
