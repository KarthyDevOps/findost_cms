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
  if(params.categorySlug == "courses")
  {
    function timeConvert(n) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return [rhours,rminutes]
    }
    console.log('newvalues',newvalues)
    let totalMinutes = 0
    newvalues.courseDetails = newvalues.courseDetails.map((data)=>{
      let minutes = 0
      data.list = data.list.map((list)=>{
        minutes = minutes + (Number(list.hrs) * 60) + Number(list.min)
        totalMinutes = totalMinutes + (Number(list.hrs) * 60) + Number(list.min)
      })
      let timeResp = timeConvert(minutes)
      data.hrs = timeResp[0]
      data.min = timeResp[1]
      return data
    })
    let totalTimeResp = timeConvert(totalMinutes)
    newvalues.totalHrs =totalTimeResp[0]
    newvalues.totalMin =totalTimeResp[1]
  }
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
    _id:params?.id,
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
