const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Content } = require("../models/content");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getContentList } = require("./list.service");
const createContentService = async (params) => {
  var newvalues = params;
  const resp = await Content.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};

const getContentService = async (params) => {
  var payload = {
    _id: params?.contentId || params.id,
    isDeleted: false,
  };
  const resp = await Content.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateContentService = async (params) => {
  var payload = {
    _id: params?.contentId,
    isDeleted: false,
    updatedBy: params?.updatedBy,
  };
  delete params["contentId"];
  var newvalues = {
    $set: params,
  };
  const resp = await Content.updateOne(payload, newvalues);
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

const contentListService = async (params) => {
  params.all = true;
  const allList = await getContentList(params);
  params.all = false;

  const result = await getContentList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

const deleteContentService = async (params) => {
  var payload = {
    _id: params?.contentId,
    isDeleted: false,
    updatedBy: params?.updatedBy,
  };
  var newvalues = {
    $set: { isDeleted: true },
  };

  const resp = await Content.updateOne(payload, newvalues);
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

const exportContentService = async (res, params) => {
  //get all content list created by admin
  params.all = true;
  const contentList = await getContentList(params);

  // format content data list
  params.type = "content";
  params.list = contentList;

  //format the data based on content or trucker for csv file
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
  createContentService,
  getContentService,
  updateContentService,
  contentListService,
  deleteContentService,
  exportContentService,
};
