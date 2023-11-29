const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Product } = require("../models/product");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");

const { getProductList, getProductTypeFilterList } = require("./list.service");

const { getSignedURL } = require("../utils/s3Utils");

const createProductService = async (params) => {

  const resp = await Product.create(params);

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
  if(resp) {

    if(resp.benefits.length > 0){
      resp.benefits = resp.benefits.map((x)=>{
        x.benefitIconS3 = getSignedURL(x.benefitKey)
        return x
      })
  }
}
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
    isDeleted: false,
  };
  delete params["productId"];
  var newvalues = {
    $set: params,
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
  params.all = params.returnAll == true ? true : false;
  const result = await getProductList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

const productTypeFilterListService = async (params) => {
  params.all = true;
  const allList = await getProductTypeFilterList(params);
  params.all = params.returnAll == true ? true : false;
  const result = await getProductTypeFilterList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};
const deleteProductService = async (params) => {
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
  const resp = await Product.updateMany({ _id: ids }, newvalues);
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
  productTypeFilterListService,
};
