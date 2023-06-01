const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Faq } = require("../models/faq");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");

const { getFaqList } = require("./list.service");


const createFaqService = async (params) => {
  var newvalues = params;
  const resp = await Faq.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};

const getFaqService = async (params) => {
  var payload = {
    _id: params?.faqId,
    isDeleted: false,
  };
  const resp = await Faq.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateFaqService = async (params) => {
  var payload = {
    _id: params?.faqId,
    isDeleted: false,
  };
  delete params["faqId"];
  var newvalues = {
    $set: params,
  };
  const resp = await Faq.updateOne(payload, newvalues);
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

const faqListService = async (params) => {
  params.all = true;
  const allList = await getFaqList(params);
  params.all = false;

  const result = await getFaqList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

const deleteFaqService = async (params) => {
  var payload = {
    _id: params?.faqId,
    isDeleted: false,
  };
  var newvalues = {
    $set: { isDeleted: true },
  };

  const resp = await Faq.updateOne(payload, newvalues);
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

const exportFaqService = async (res, params) => {
  //get all faq list created by admin
  params.all = true;
  const faqList = await getFaqList(params);

  // format faq data list
  params.type = "faq";
  params.list = faqList;

  //format the data based on faq or trucker for csv file
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
  createFaqService,
  getFaqService,
  updateFaqService,
  faqListService,
  deleteFaqService,
  exportFaqService,
};
