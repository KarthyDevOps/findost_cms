const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  faqListService,
  createFaqService,
  getFaqService,
  updateFaqService,
  deleteFaqService,
  exportFaqService,
} = require("../services/faq.service");

const createFaq = async (req, res) => {
  const params = req.body;
  params.createdBy = req?.user?._id?.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await createFaqService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const getFaq = async (req, res) => {
  const params = req.body;
  params.faqId = req?.query?.faqId;
  const result = await getFaqService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const updateFaq = async (req, res) => {
  const params = req.body;
  params.faqId = req?.query?.faqId;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await updateFaqService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const faqList = async (req, res) => {
  const params = req?.query;
  if(!params?.limit) params.limit =10
  if(!params?.page) params.page = 1
  params.limit = parseInt(params?.limit);
  params.page = parseInt(params?.page);
  console.log("req", params);
  const result = await faqListService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const deleteFaq = async (req, res) => {
  
  const params = req.body;
  if (req.query.id) {
    params.id = req?.query?.id;
  }
  params.ids = req.body.ids;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await deleteFaqService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

// export related api's

const exportFaq = async (req, res) => {
  const params = {};
  const result = await exportFaqService(res, params);
  return result;
  // if (!result.status) {
  //   return sendErrorResponse(
  //     req,
  //     res,
  //     result.statusCode,
  //     result.message,
  //     result.data
  //   );
  // }
  // return sendSuccessResponse(
  //   req,
  //   res,
  //   result.statusCode,
  //   result.message,
  //   result.data
  // );
};

module.exports = {
  createFaq,
  getFaq,
  updateFaq,
  faqList,
  deleteFaq,
  exportFaq,
};
