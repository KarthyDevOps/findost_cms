const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Template } = require("../models/template");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getTemplateList } = require("./list.service");
const createTemplateService = async (params) => {
  var newvalues = params;
  const resp = await Template.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};
const getTemplateService = async (params) => {
  var payload = {
    _id: params?.templateId,
    isDeleted: false,
  };
  const resp = await Template.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const updateTemplateService = async (params) => {
  var payload = {
    _id: params?.templateId,
    isDeleted: false
  };
  delete params["templateId"];
  var newvalues = {
    $set: params,
  };
  const resp = await Template.updateOne(payload, newvalues);
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
const templateListService = async (params) => {
  params.all = true;
  const allList = await getTemplateList(params);
  params.all = false;
  const result = await getTemplateList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};
const deleteTemplateService = async (params) => {
  var payload = {
    _id: params?.templateId,
    isDeleted: false,
    
  };
  var newvalues = {
    $set: { isDeleted: true },
  };
  const resp = await Template.updateOne(payload, newvalues);
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
  createTemplateService,
  getTemplateService,
  updateTemplateService,
  templateListService,
  deleteTemplateService,
};
