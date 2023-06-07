const { Faq } = require("../models/faq");
const { Feedback } = require("../models/feedback");
const { Template } = require("../models/template");
const { Content } = require("../models/content");
const { Product } = require("../models/product");
const { KnowledgeCenter } = require("../models/knowledgeCenter");
const getFaqList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { faqId: { $regex: `${params?.search}`, $options: "i" } },
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    if (params?.category) {
      filter.category = params?.category;
    }
    data = await Faq.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    if (params?.category) {
      filter.category = params?.category;
    }
    data = await Faq.find(filter)
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
const getFeedbackList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { feedbackId: { $regex: `${params?.search}`, $options: "i" } },
        { feedback: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Feedback.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Feedback.find(filter)
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
const getTemplateList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Template.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Template.find(filter)
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
const getContentList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Content.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Content.find(filter)
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
const getProductList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Product.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Product.find(filter)
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
const getKnowledgeCenterList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await KnowledgeCenter.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } },
        { category: { $regex: `${params?.search}`, $options: "i" } },
        { subCategory: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await KnowledgeCenter.find(filter)
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
module.exports = {
  getFaqList,
  getFeedbackList,
  getTemplateList,
  getContentList,
  getProductList,
  getKnowledgeCenterList,
};
