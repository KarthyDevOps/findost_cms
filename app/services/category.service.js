const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Category } = require("../models/category");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getCategoryList } = require("./list.service");
const createCategoryService = async (params) => {
  var newvalues = params;
  const resp = await Category.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};

const getCategoryService = async (params) => {
  var payload = {
    _id: params?.categoryId || params.id,
    isDeleted: false,
  };
  const resp = await Category.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateCategoryService = async (params) => {
  var payload = {
    _id: params?.categoryId || params.id,
    isDeleted: false,
  };
  delete params["categoryId"];
  var newvalues = {
    $set: params,
  };
  const resp = await Category.updateOne(payload, newvalues);
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

const categoryListService = async (params) => {
  params.all = true;
  const allList = await getCategoryList(params);
  params.all = params.returnAll ==true ? true : false;

  const result = await getCategoryList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

const deleteCategoryService = async (params) => {
  var payload = {
    _id: params?.categoryId,
    isDeleted: false,
  };
  var newvalues = {
    $set: { isDeleted: true },
  };

  const resp = await Category.updateOne(payload, newvalues);
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

const exportCategoryService = async (res, params) => {
  //get all category list created by admin
  params.all = true;
  const categoryList = await getCategoryList(params);

  // format category data list
  params.type = "category";
  params.list = categoryList;

  //format the data based on category or trucker for csv file
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
  createCategoryService,
  getCategoryService,
  updateCategoryService,
  categoryListService,
  deleteCategoryService,
  exportCategoryService,
};
