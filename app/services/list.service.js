const { Faq } = require("../models/faq");
const { Feedback } = require("../models/feedback");
const { Template } = require("../models/template");
const { Content } = require("../models/content");
const { Product } = require("../models/product");
const { KnowledgeCenter } = require("../models/knowledgeCenter");
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


  
const getFeedbackList = async (params) => {
    let data;
    if (params.all) {
      if (params?.search) {
        data = await Feedback.find({
          isDeleted: false,
          $or: [
            { title: { $regex: `${params?.search}`, $options: "i" } },
            { content: { $regex: `${params?.search}`, $options: "i" } },
            { type: { $regex: `${params?.search}`, $options: "i" } },
          ],
        }).sort({ createdAt: -1 });
      } else {
        data = await Feedback.find({
          isDeleted: false,
        });
      }
    } else if (params?.search) {
      data = await Feedback.find({
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
      data = await Feedback.find({
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
  
const getTemplateList = async (params) => {
    let data;
    if (params.all) {
      if (params?.search) {
        data = await Template.find({
          isDeleted: false,
          $or: [
            { title: { $regex: `${params?.search}`, $options: "i" } },
            { content: { $regex: `${params?.search}`, $options: "i" } },
            { type: { $regex: `${params?.search}`, $options: "i" } },
          ],
        }).sort({ createdAt: -1 });
      } else {
        data = await Template.find({
          isDeleted: false,
        });
      }
    } else if (params?.search) {
      data = await Template.find({
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
      data = await Template.find({
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

  
const getContentList = async (params) => {
  let data;
  if (params.all) {
    if (params?.search) {
      data = await Content.find({
        isDeleted: false,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      data = await Content.find({
        isDeleted: false,
      });
    }
  } else if (params?.search) {
    data = await Content.find({
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
    data = await Content.find({
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



const getProductList = async (params) => {
  let data;
  if (params.all) {
    if (params?.search) {
      data = await Product.find({
        isDeleted: false,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      data = await Product.find({
        isDeleted: false,
      });
    }
  } else if (params?.search) {
    data = await Product.find({
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
    data = await Product.find({
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


const getKnowledgeCenterList = async (params) => {
  let data;
  if (params.all) {
    if (params?.search) {
      data = await KnowledgeCenter.find({
        isDeleted: false,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      data = await KnowledgeCenter.find({
        isDeleted: false,
      });
    }
  } else if (params?.search) {
    data = await KnowledgeCenter.find({
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
    data = await KnowledgeCenter.find({
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


  module.exports = {
    
    getFaqList,
    getFeedbackList,
    getTemplateList,
    getContentList,
    getProductList,
    getKnowledgeCenterList
  };
  