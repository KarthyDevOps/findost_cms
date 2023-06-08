const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { SubCategory } = require("../models/subCategory");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getSubCategoryList } = require("./list.service");
const createSubCategoryService = async (params) => {
  var newvalues = params;
  const resp = await SubCategory.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};

const getSubCategoryService = async (params) => {
  var payload = {
    _id: params?.subCategoryId || params.id,
    isDeleted: false,
  };
  const resp = await SubCategory.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateSubCategoryService = async (params) => {
  var payload = {
    _id: params?.subCategoryId || params.id,
    isDeleted: false,
  };
  delete params["subCategoryId"];
  var newvalues = {
    $set: params,
  };
  const resp = await SubCategory.updateOne(payload, newvalues);
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

const subCategoryListService = async (params) => {
  params.all = true;
  const allList = await getSubCategoryList(params);
  params.all = params.returnAll ==true ? true : false;

  const result = await getSubCategoryList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

const deleteSubCategoryService = async (params) => {
  var payload = {
    _id: params?.subCategoryId,
    isDeleted: false,
  };
  var newvalues = {
    $set: { isDeleted: true },
  };

  const resp = await SubCategory.updateOne(payload, newvalues);
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

// export related api's

const exportSubCategoryService = async (res, params) => {
  //get all subCategory list created by admin
  params.all = true;
  const subCategoryList = await getSubCategoryList(params);

  // format subCategory data list
  params.type = "subCategory";
  params.list = subCategoryList;

  //format the data based on subCategory or trucker for csv file
  const formatList = await formatDataList(params);
  if (!formatList.status) {
    res.status(400).send({
      status: false,
      message: messages?.dataNotFound,
    });
  }

  //convtert formated data to csv file
  await convert_JSON_to_file(res, formatList, params);
  return res;
};

module.exports = {
  createSubCategoryService,
  getSubCategoryService,
  updateSubCategoryService,
  subCategoryListService,
  deleteSubCategoryService,
  exportSubCategoryService,
};
