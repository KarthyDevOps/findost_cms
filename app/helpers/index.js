
const { Faq } = require("../models/faq");
const json2csv = require("json2csv").parse;
const sendOTP = (mobileNumber, type = "customer") => {
  if (mobileNumber) {
    return 1234;
  }
  throw new Error("");
};
const errHandle = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
const pageMetaService = async (params, count) => {
  try {
    return {
      pageCount: Math.ceil(count / Number(params.limit)),
      nextPage:
      Number(params.page) >= Math.ceil(count / Number(params.limit))
          ? null
          : Number(params?.page) + 1,
      pageSize: Number(params?.limit),
      total: count,
      currentPage: Number(params?.page),
    };
  } catch (error) {
    throw Error(error);
  }
};
const getFaqList = async (params) => {
  let data;
  if (params.all) {
    if (params?.search) {
      data = await Faq.find({
        isDeleted: false,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      data = await Faq.find({
        isDeleted: false,
      });
    }
  } else if (params?.search) {
    data = await Faq.find({
      isDeleted: false,
      $or: [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { content: { $regex: `${params?.search}`, $options: "i" } },
        { type: { $regex: `${params?.search}`, $options: "i" } },
      ],
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  } else {
    data = await Faq.find({
      isDeleted: false,
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};
const formatDataList = async (params) => {
  let finalList = [];
  const list = params?.list?.data?.length ? params.list?.data : [];
  // check list contains data's for category or faq
  if (list && list?.length) {
    if (params.type == "faq") {
      finalList = await faqDataAlignment(list);
    }
    return {
      status: true,
      data: finalList?.data,
    };
  } else {
    return {
      status: false,
      data: [],
    };
  }
};
const faqDataAlignment = async (list) => {
  let json,
    finalList = [];
  list.map((data) => {
    json = {
      ["Faq Id"]: data._id ? data._id.toString() : null,
      ["Question"]: data.question ? data.question : null,
      ["Answer"]: data.answer ? data.answer : null,
      ["Type"]: data.type ? data.type : null,
      ["Created Time"]: data.createdAt ? data.createdAt : null,
      ["Updated Time"]: data.updatedAt ? data.createdAt : null,
      ["Active"]: data.isActive ? data.isActive : null,
    };
    //push the every object into finalList array
    finalList.push(json);
  });
  return {
    status: true,
    data: finalList,
  };
};
const convert_JSON_to_file = async (res, data, params) => {
  let type = params?.type,
    fileType = params?.fileType;
  //export json data into csv file
  const csvString = json2csv(data?.data);
  if (fileType === "csv") {
    if (type == "waitingCharge") {
      res.setHeader(
        "Content-disposition",
        "attachment; filename=Waiting Charge Export.xlsx"
      );
    }
  } else if (fileType === "xlsx") {
    if (type == "waitingCharge") {
      res.setHeader(
        "Content-disposition",
        "attachment; filename=Waiting Charge Export.xlsx"
      );
    }
  }
  res.set("Content-Type", "text/csv");
  res.status(200).send(csvString);
  return res;
};
module.exports = {
  sendOTP,
  errHandle,
  pageMetaService,
  getFaqList,
  formatDataList,
  faqDataAlignment,
  convert_JSON_to_file,
};
