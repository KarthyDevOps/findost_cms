const { Faq } = require("../models/faq");
const { Feedback } = require("../models/feedback");
const { Template } = require("../models/template");
const { Content } = require("../models/content");
const { Product } = require("../models/product");
const { KnowledgeCenter } = require("../models/knowledgeCenter");
const moment = require("moment");
const { Category } = require("../models/category");
const { SubCategory } = require("../models/subCategory");
const mongoose = require("mongoose");
const { decode } = require("jsonwebtoken");

const getFaqList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };

    if (params?.isActive) {
      filter.isActive = params.isActive;
    }

    if (params?.category) {
      filter.category = new mongoose.Types.ObjectId(params.category);
    }

    if (params?.subCategory) {
      filter.subCategory = new mongoose.Types.ObjectId(params.subCategory);
    }

    if (params?.search) {
      filter.$or = [
        { faqId: { $regex: `${params?.search}`, $options: "i" } },
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } }
      ];
    }

    data = await Faq.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };

    if (params?.isActive) {
      filter.isActive = params.isActive;
    }

    if (params?.category) {
      filter.category =  new mongoose.Types.ObjectId(params.category);
    }

    if (params?.subCategory) {
      filter.subCategory = new mongoose.Types.ObjectId(params.subCategory);
    }

    if (params?.search) {
      filter.$or = [
        { faqId: { $regex: `${params?.search}`, $options: "i" } },
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { answer: { $regex: `${params?.search}`, $options: "i" } }
      ];
    }
   
    data = await Faq.aggregate([
      {
        '$match': filter
      },
      {
        $lookup: {
          from: 'categories', 
          localField: 'category', 
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'subcategories', 
          localField: 'subCategory',
          foreignField: '_id', 
          as: 'subCategory'
        }
      },
      {
        $sort: {
          createdAt:  -1
        }
      },
      {
        $skip: (params.page - 1) * params.limit
      },
      {
        $limit: params.limit
      }
    ])
  }

  if (data && data.length) {
    data =data.map((d)=>{
      d.subCategory = Array.isArray(d.subCategory) ? d.subCategory[0]?.name:  d.subCategory;
      d.category = Array.isArray(d.category) ? d.category[0]?.name:  d.category;
      return d;
    })
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
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.status) {
      filter.status = params.status;
    }

    if (params.startDate && params.endDate) {
      console.log("BothDate all-->",params)
      let formattedStartDate = moment(new Date(params?.startDate)).startOf('day');
      let formattedEndDate = moment(new Date(params?.endDate)).endOf('day');
      filter.createdAt = { $gte: formattedStartDate, $lte: formattedEndDate };
    }

    if (params.startDate  && !params.endDate) {
      console.log("startDate all-->",params)
      let formattedStartDate = moment(new Date(params?.startDate)).startOf('day');
      filter.createdAt = {
        $gte: formattedStartDate,
        $lte: new Date(),
      };
    }

    if (params.endDate && !params.startDate) {
      console.log("endDate all -->",params)
      let formattedEndDate = moment(new Date(params?.endDate)).endOf('day');
      filter.createdAt = {
        $lte: formattedEndDate,
      };
    } 
    if (params?.search) {
      filter.$or = [
        { feedbackId: { $regex: `${params?.search}`, $options: "i" } },
        { userId: { $regex: `${params?.search}`, $options: "i" } },
        { userName: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Feedback.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.status) {
      filter.status = params.status;
    }

    if (params.startDate && params.endDate) {
      console.log("bothDate->",params)
      let formattedStartDate = moment(new Date(params?.startDate)).startOf('day');
      let formattedEndDate = moment(new Date(params?.endDate)).endOf('day');
      filter.createdAt = { $gte: formattedStartDate, $lte: formattedEndDate };
    }

    if (params.startDate && !params.endDate) {
      console.log("startDate->",params)
      let formattedStartDate = moment(new Date(params?.startDate)).startOf('day');;
      filter.createdAt = {
        $gte: formattedStartDate,
        $lte: new Date(),
      };
    }

    if (params.endDate && !params.startDate) {
      console.log("endDate->",params)
      let formattedEndDate = moment(new Date(params?.endDate)).endOf('day');
      filter.createdAt = {
        $lte: formattedEndDate,
      };
    }

    if (params?.search) {
      filter.$or = [
        { feedbackId: { $regex: `${params?.search}`, $options: "i" } },
        { userId: { $regex: `${params?.search}`, $options: "i" } },
        { userName: { $regex: `${params?.search}`, $options: "i" } },
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
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.status) {
      filter.status = params.status;
    }
    if (params.messageType || params.type) {
      filter.type = params.messageType || params.type;
    }

    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { templateId: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Template.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.status) {
      filter.status = params.status;
    }
    if (params.messageType || params.type) {
      filter.type = params.messageType || params.type;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { templateId: { $regex: `${params?.search}`, $options: "i" } },
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
        { contentId: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Content.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { contentId: { $regex: `${params?.search}`, $options: "i" } },
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
    if (params.productType) {
      filter.productType = params.productType;
    }
    if (params?.search) {
      filter.$or = [
        { productName: { $regex: `${params?.search}`, $options: "i" } },
        { productId: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Product.find(filter).sort({productId:1});
  } else {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params.productType) {
      filter.productType = params.productType;
    }
    if (params?.search) {
      filter.$or = [
        { productName: { $regex: `${params?.search}`, $options: "i" } },
        { productId: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Product.find(filter)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ productId:1});
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
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.category) {
      filter.category = new mongoose.Types.ObjectId(params.category);
    }
    if (params?.subCategory) {
      filter.subCategory = new mongoose.Types.ObjectId(params.subCategory);
    }
    if (params?.search) {
      filter.$or = [
        { knowledgeCenterId: params?.search },
        { title: { $regex: `${params?.search}`, $options: "i" } },

      ];
    }
    data = await KnowledgeCenter.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.category) {
      filter.category = new mongoose.Types.ObjectId(params.category);
    }
    if (params?.subCategory) {
      filter.subCategory = new mongoose.Types.ObjectId(params.subCategory);
    }

    if (params?.search) {
      filter.$or = [
        { knowledgeCenterId: { $regex: `${params?.search}`, $options: "i" } },
        { title: { $regex: `${params?.search}`, $options: "i" } }
      ];
    }

    data = await KnowledgeCenter.aggregate([
      {
        '$match': filter
      },
      {
        $lookup: {
          from: 'categories', 
          localField: 'category', 
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'subcategories', 
          localField: 'subCategory',
          foreignField: '_id', 
          as: 'subCategory'
        }
      },
      {
        $sort: {
          createdAt:  -1
        }
      },
      {
        $skip: (params.page - 1) * params.limit
      },
      {
        $limit: params.limit
      }
    ])

  }
  if (data && data.length) {
    data =data.map((d)=>{
      d.subCategory = Array.isArray(d.subCategory) ? d.subCategory[0]?.name:  d.subCategory;
      d.category = Array.isArray(d.category) ? d.category[0]?.name:  d.category;
      return d;
    })
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};

const getCategoryList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
   if(params?.type) {
    filter.type = params.type 
   }
    if (params?.search) {
      filter.$or = [
        { categoryId: params?.search },
        { name: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Category.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.category) {
      filter.category = params.category;
    }
    if (params?.subCategory) {
      filter.subCategory = params.subCategory;
    }

    if (params?.search) {
      filter.$or = [
        { categoryId: params?.search },
        { name: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Category.find(filter)
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



const getSubCategoryList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.categoryId) {
      filter.categoryId = params.categoryId;
    }
    if (params?.search) {
      filter.$or = [
        { subCategoryId: params?.search },
        { name: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await SubCategory.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.categoryId) {
      filter.categoryId = params.categoryId;
    }
   

    if (params?.search) {
      filter.$or = [
        { subCategoryId: params?.search },
        { name: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await SubCategory.find(filter)
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
  getCategoryList,
  getSubCategoryList
};
