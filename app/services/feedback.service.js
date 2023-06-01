const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Feedback } = require("../models/feedback");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getFeedbackList } = require("./list.service");
const createFeedbackService = async (params) => {
  var newvalues = params;
  const resp = await Feedback.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};
const getFeedbackService = async (params) => {
  var payload = {
    _id: params?.feedbackId,
    isDeleted: false,
  };
  const resp = await Feedback.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const updateFeedbackService = async (params) => {
  var payload = {
    _id: params?.feedbackId,
    isDeleted: false
  };
  delete params["feedbackId"];
  var newvalues = {
    $set: params,
  };
  const resp = await Feedback.updateOne(payload, newvalues);
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
const feedbackListService = async (params) => {
  params.all = true;
  const allList = await getFeedbackList(params);
  params.all = false;
  const result = await getFeedbackList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};
const deleteFeedbackService = async (params) => {
  var payload = {
    _id: params?.feedbackId,
    isDeleted: false,
    
  };
  var newvalues = {
    $set: { isDeleted: true },
  };
  const resp = await Feedback.updateOne(payload, newvalues);
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
  createFeedbackService,
  getFeedbackService,
  updateFeedbackService,
  feedbackListService,
  deleteFeedbackService,
};
