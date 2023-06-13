const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { KnowledgeCenter } = require("../models/knowledgeCenter");
const mongoose = require("mongoose");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getKnowledgeCenterList } = require("./list.service");
const createKnowledgeCenterService = async (params) => {
  var newvalues = params;
  const resp = await KnowledgeCenter.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};
const getKnowledgeCenterService = async (params) => {
  var payload = {
    _id:params?.id,
    isDeleted: false,
  };
  const resp = await KnowledgeCenter.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const updateKnowledgeCenterService = async (params) => {
  var payload = {
    _id: mongoose.Types.ObjectId(params?.knowledgeCenterId),
    isDeleted: false
  };
  delete params["knowledgeCenterId"];
  var newvalues = {
    $set: params,
  };
  const resp = await KnowledgeCenter.updateOne(payload, newvalues);
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
const knowledgeCenterListService = async (params) => {
  params.all = true;
  const allList = await getKnowledgeCenterList(params);
  params.all = params.returnAll ==true ? true : false;
  const result = await getKnowledgeCenterList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};
const deleteKnowledgeCenterService = async (params) => {
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
  const resp = await KnowledgeCenter.updateMany({_id:ids}, newvalues);
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
  createKnowledgeCenterService,
  getKnowledgeCenterService,
  updateKnowledgeCenterService,
  knowledgeCenterListService,
  deleteKnowledgeCenterService,
};
