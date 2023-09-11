const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Faq } = require("../models/faq");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const mongoose = require("mongoose");

const { getCouseManagementList } = require("./list.service");
const { courseManagement } = require("../models/courseManagement");
const { KnowledgeCenter } = require("../models/knowledgeCenter");

const createCourseManagementService = async (params) => {
  var newvalues = params;
  let checkExist = await courseManagement.findOne({
    courseId: params?.courseId,
    apId: params?.apId,
  });

  if (checkExist) {

    completedlecture = [];

    checkExist.completedlecture.push(params?.completedlecture);

    params.completedlecture =  checkExist.completedlecture

    console.log('params--->', params)

    const resp = await courseManagement.findOneAndUpdate(
      { apId: params?.apId, courseId: params?.courseId },
      params
    );
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.created,
      data: resp,
    };
  } else {
    newvalues.completedlecture = [newvalues?.completedlecture];
    const resp = await courseManagement.create(newvalues);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.created,
      data: {
        _id: resp?._id,
      },
    };
  }
};

const getCourseManagementService = async (params) => {
  var payload = {
    _id: params?.courseId,
    isDeleted: false,
  };
  const resp = await courseManagement.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateCourseManagementService = async (params) => {
  var payload = {
    _id: params?.courseId,
    isDeleted: false,
  };
  delete params["courseId"];
  var newvalues = {
    $set: params,
  };
  const resp = await courseManagement.updateOne(payload, newvalues);
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

const CourseManagementListService = async (params) => {
  params.all = true;
  const allList = await getCouseManagementList(params);
  params.all = params.returnAll == true ? true : false;

  const result = await getCouseManagementList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

const deleteCourseManagementService = async (params) => {
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

  const resp = await courseManagement.updateMany({ _id: ids }, newvalues);
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

const getMycourseListService = async (params) => {
  let filter = {
    isDeleted: false,
    apId: params.apId,
  };
  if (params?.isActive) {
    filter.isActive = params.isActive;
  }
  data = await courseManagement.find(filter);
  let courseIds =[]
  data.map((d)=>{
    courseIds.push(d.courseId)
  })

  let aggregateQuery = [
    {
      $match: {
        isDeleted: false,
        courseId : { $in: courseIds }
      },
    },
    {
      $group: {
        _id: "$courseId",
        count: { $sum: 1 },
      },
    },

  ];
  let countResp = await courseManagement.aggregate(aggregateQuery);
  console.log('countResp',countResp)
  let obj ={}
  countResp.map((d)=>{
    courseIds.push(d._id)
    obj[d._id] = d.count
  })
  let resp = await KnowledgeCenter.find({_id : { $in: courseIds.map(_id =>new mongoose.Types.ObjectId(_id)) }}).lean();
  resp = resp.map((d)=>{
    d.count = obj[d._id] || 0
    return d
  })
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: resp,
  };
};


const getTrendingCourseListService = async (params) => {
  let aggregateQuery = [
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$courseId",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ];
  console.log("aggregateQuery-->", aggregateQuery);
  data = await courseManagement.aggregate(aggregateQuery);
  console.log("courseManagement-->", data);
  let courseIds = [];
  let obj = {};
  data.map((d) => {
    courseIds.push(d._id);
    obj[d._id] = d.count;
  });
  let resp = await KnowledgeCenter.find({
    _id: { $in: courseIds.map((_id) => new mongoose.Types.ObjectId(_id)) },
  }).lean();
  resp = resp.map((d) => {
    d.count = obj[d._id];
    return d;
  });
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: resp,
  };
};

  

  const getMyCompletedcourseListService = async (params) => {
    let filter = {
      isDeleted: false,
      apId: params.apId,
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    data = await courseManagement.find(filter);
    data = data.map((d)=>{
      let res ={
        courseId : d.courseId,
        completedlecture : d.completedlecture,
      }
      return res
    })
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      data: data,
    };
  };
  
  

  
module.exports = {
  createCourseManagementService,
  getCourseManagementService,
  updateCourseManagementService,
  CourseManagementListService,
  deleteCourseManagementService,
  getMycourseListService,
  getTrendingCourseListService,
  getMyCompletedcourseListService
};
