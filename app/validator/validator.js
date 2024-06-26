const joi = require("joi");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { joierrors } = require("../response/response");
const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true,
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true,
    },
  },
};

const bodyParamValidation = (req, res, next, schama) => {
  let schema = schama;
  let option = options.basic;
  var { error, value } = schema.validate(req.body, option);
  if (error && Object.keys(error).length > 0) {
    joierrors(
      req,
      res,
      statusCodes.HTTP_BAD_REQUEST,
      statusMessage[400],
      error
    );
  } else {
    next();
  }
};

const queryParamValidation = (req, res, next, schama) => {
  let schema = schama;
  let option = options.basic;
  var { error, value } = schema.validate(req.query, option);
  if (error && Object.keys(error).length > 0) {
    joierrors(
      req,
      res,
      statusCodes.HTTP_BAD_REQUEST,
      statusMessage[400],
      error
    );
  } else {
    if (req?.bodyParam) return;
    else next();
  }
};

const faqListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createFaqValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    answer: joi.string().required(),
    isActive: joi.boolean(),
    category: joi.string().required(),
    subCategory: joi.string().required(),
    status: joi.string().optional(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getFaqValidation = (req, res, next) => {
  const querySchema = joi.object({
    faqId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateFaqValidation = (req, res, next) => {
  const querySchema = joi.object({
    faqId: joi.string().required(),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    title: joi.string(),
    answer: joi.string(),
    isActive: joi.boolean(),
    category: joi.string(),
    subCategory: joi.string(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteFaqValidation = (req, res, next) => {
  const querySchema = joi.object({
    faqId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const feedbackListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createFeedbackValidation = (req, res, next) => {
  const schema = joi.object({
    userId: joi.string().optional(),
    userName: joi.string().optional(),
    isActive: joi.boolean(),
    feedback: joi.string().required(),
    status: joi.string().optional(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getFeedbackValidation = (req, res, next) => {
  const querySchema = joi.object({
    feedbackId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateFeedbackValidation = (req, res, next) => {
  const querySchema = joi.object({
    feedbackId: joi.string().required(),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    userId: joi.string().optional(),
    userName: joi.string(),
    isActive: joi.boolean(),
    feedback: joi.string(),
    status: joi.string(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteFeedbackValidation = (req, res, next) => {
  const querySchema = joi.object({
    feedbackId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const templateListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createTemplateValidation = (req, res, next) => {
  const schema = joi.object({
    type: joi.string().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.boolean(),
    categoryId: joi.string().required(),
    isActive: joi.boolean().optional(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getTemplateValidation = (req, res, next) => {
  const querySchema = joi.object({
    templateId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateTemplateValidation = (req, res, next) => {
  const querySchema = joi.object({
    templateId: joi.string().required(),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    type: joi.string().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.boolean(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteTemplateValidation = (req, res, next) => {
  const querySchema = joi.object({
    templateId: joi.string().optional(),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const createSiteSettingsValidation = (req, res, next) => {
  const schema = joi.object({
    siteUrl: joi.string(),
    supportNumber: joi.string(),
    supportEmail: joi.string(),
    sitelogo: joi.string(),
    siteFavIcon: joi.string(),
    copyrightsText: joi.string(),
    tac :joi.string(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getSiteSettingsValidation = (req, res, next) => {
  const querySchema = joi.object({
    templateId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateSiteSettingsValidation = (req, res, next) => {
  const schema = joi.object({
    siteUrl: joi.string(),
    supportNumber: joi.string(),
    supportEmail: joi.string(),
    sitelogo: joi.string(),
    siteFavIcon: joi.string(),
    copyrightsText: joi.string(),
    tac :joi.string(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const contentListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createContentValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    isActive: joi.boolean(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getContentValidation = (req, res, next) => {
  const querySchema = joi.object({
    contentId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateContentValidation = (req, res, next) => {
  const querySchema = joi.object({
    contentId: joi.string().optional(),
    id: joi.string().required(),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    isActive: joi.boolean(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteContentValidation = (req, res, next) => {
  const querySchema = joi.object({
    contentId: joi.string().optional(),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const productListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createProductValidation = (req, res, next) => {
  const schema = joi.object({
    productName: joi.string().required(),
    productType: joi.string().required(),
    productIcon: joi.string().required(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getProductValidation = (req, res, next) => {
  const querySchema = joi.object({
    productId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateProductValidation = (req, res, next) => {
  const querySchema = joi.object({
    productId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    productName: joi.string().required(),
    productType: joi.string().required(),
    productIcon: joi.string().required(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteProductValidation = (req, res, next) => {
  const querySchema = joi.object({
    productId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const knowledgeCenterListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

//create ticket validation
const CreateTicketValidation = (req, res, next) => {
  const schema = joi.object({
    source: joi.required(),
    priorityScore: joi.required(),
    customerEmailId: joi.required(),
    subject: joi.required(),
    issueDescription: joi.required(),
    attachmentExtension: joi.allow(null).allow("").optional(),
    attachment: joi.allow(null).allow("").optional(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const createKnowledgeCenterValidation = (req, res, next) => {
  const schema = joi.object({
    categorySlug: joi.string().required(),
    documentPath: joi.any().when("categorySlug", {
      switch: [
        {
          is: "documents",
          then: joi.string().required(),
        },
      ],
    }),
    courseType: joi.string().optional(),
    subCategory: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Sub Category is not allowed to be Empty",
        "any.required": "Sub Category is not allowed to be Empty",
      }),
    description: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Description is not allowed to be Empty",
        "any.required": "Description is not allowed to be Empty",
      }),
    contentUrlLink: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Content Url is not allowed to be Empty",
        "any.required": "Content Url  is not allowed to be Empty",
      }),
    isActive: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "documents",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Status is not allowed to be Empty",
        "any.required": "Status  is not allowed to be Empty",
      }),
    title: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "documents",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Title is not allowed to be Empty",
        "any.required": "Title  is not allowed to be Empty",
      }),
    category: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "documents",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Category is not allowed to be Empty",
        "any.required": "Category  is not allowed to be Empty",
      }),
    thumbnail: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Thumbnail is not allowed to be Empty",
        "any.required": "Thumbnail  is not allowed to be Empty",
      }),
    fileOriginalName: joi.string().optional(),
    courseDetails: joi
      .array()
      .items(
        joi.object({
          title: joi.string().required(),
          list: joi.array().items(
            joi.object({
              title: joi.string().required(),
              hrs: joi.string().required(),
              min: joi.string().required(),
              description: joi.string().optional(),
              link: joi.string().required(),
            })
          ),
        })
      )
      .when("categorySlug", {
        is: "courses",
        then: joi.required(),
        otherwise: joi.optional(),
      }),
  });
  return bodyParamValidation(req, res, next, schema);
};

const createProductCmsValidation = (req, res, next) => {
  const schema = joi.object({
    categorySlug: joi.string().required(),
    documentPath: joi.any().when("categorySlug", {
      switch: [
        {
          is: "documents",
          then: joi.string().required(),
        },
      ],
    }),
    courseType: joi.string().optional(),
    subCategory: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Sub Category is not allowed to be Empty",
        "any.required": "Sub Category is not allowed to be Empty",
      }),
    description: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Description is not allowed to be Empty",
        "any.required": "Description is not allowed to be Empty",
      }),
    contentUrlLink: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Content Url is not allowed to be Empty",
        "any.required": "Content Url  is not allowed to be Empty",
      }),
    isActive: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "documents",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Status is not allowed to be Empty",
        "any.required": "Status  is not allowed to be Empty",
      }),
    title: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "documents",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Title is not allowed to be Empty",
        "any.required": "Title  is not allowed to be Empty",
      }),
    category: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "urls",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "documents",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Category is not allowed to be Empty",
        "any.required": "Category  is not allowed to be Empty",
      }),
    thumbnail: joi
      .any()
      .when("categorySlug", {
        switch: [
          {
            is: "videos",
            then: joi.string().required(),
          },
          {
            is: "courses",
            then: joi.string().required(),
          },
          {
            is: "documents",
            then: joi.string().required(),
          },
          {
            is: "blogs",
            then: joi.string().required(),
          },
        ],
      })
      .messages({
        "string.empty": "Thumbnail is not allowed to be Empty",
        "any.required": "Thumbnail  is not allowed to be Empty",
      }),
    fileOriginalName: joi.string().optional(),
    courseDetails: joi
      .array()
      .items(
        joi.object({
          title: joi.string().required(),
          list: joi.array().items(
            joi.object({
              title: joi.string().required(),
              hrs: joi.string().required(),
              min: joi.string().required(),
              description: joi.string().optional(),
              link: joi.string().required(),
            })
          ),
        })
      )
      .when("categorySlug", {
        is: "courses",
        then: joi.required(),
        otherwise: joi.optional(),
      }),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getKnowledgeCenterValidation = (req, res, next) => {
  const querySchema = joi.object({
    knowledgeCenterId: joi.string().allow(null).allow("").optional(),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateKnowledgeCenterValidation = (req, res, next) => {
  const querySchema = joi.object({
    knowledgeCenterId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    title: joi.string().required(),
    isActive: joi.boolean(),
    category: joi.string(),
    subCategory: joi.string(),
    contentUrlLink: joi.string(),
    documentPath: joi.string(),
    fileOriginalName: joi.string().optional(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteKnowledgeCenterValidation = (req, res, next) => {
  const querySchema = joi.object({
    knowledgeCenterId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const categoryListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createCategoryValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    isActive: joi.boolean(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getCategoryValidation = (req, res, next) => {
  const querySchema = joi.object({
    categoryId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateCategoryValidation = (req, res, next) => {
  const querySchema = joi.object({
    categoryId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    name: joi.string().required(),
    isActive: joi.boolean(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteCategoryValidation = (req, res, next) => {
  const querySchema = joi.object({
    categoryId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const subCategoryListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createSubCategoryValidation = (req, res, next) => {
  const schema = joi.object().keys({
    name: joi.string().required(),
    categoryId: joi.string().required().messages({
      "string.empty": "Category is not allowed to be Empty",
      "any.required": "Category is not allowed to be Empty",
    }),
    isActive: joi.boolean(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const createCourseManagementValidation = (req, res, next) => {
  const schema = joi.object().keys({
    courseId: joi.string().required(),
    completedlecture: joi.string().required(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getSubCategoryValidation = (req, res, next) => {
  const querySchema = joi.object({
    subCategoryId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateSubCategoryValidation = (req, res, next) => {
  const querySchema = joi.object({
    subCategoryId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    name: joi.string().required(),
    categoryId: joi.string(),
    isActive: joi.boolean(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteSubCategoryValidation = (req, res, next) => {
  const querySchema = joi.object({
    subCategoryId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

module.exports = {
  bodyParamValidation,
  queryParamValidation,

  faqListValidation,
  createFaqValidation,
  getFaqValidation,
  updateFaqValidation,
  deleteFaqValidation,

  feedbackListValidation,
  createFeedbackValidation,
  getFeedbackValidation,
  updateFeedbackValidation,
  deleteFeedbackValidation,

  templateListValidation,
  createTemplateValidation,
  getTemplateValidation,
  updateTemplateValidation,
  deleteTemplateValidation,

  contentListValidation,
  createContentValidation,
  getContentValidation,
  updateContentValidation,
  deleteContentValidation,

  createSiteSettingsValidation,
  getSiteSettingsValidation,
  updateSiteSettingsValidation,

  productListValidation,
  createProductValidation,
  getProductValidation,
  updateProductValidation,
  deleteProductValidation,
  knowledgeCenterListValidation,
  createKnowledgeCenterValidation,
  getKnowledgeCenterValidation,
  updateKnowledgeCenterValidation,
  deleteKnowledgeCenterValidation,

  categoryListValidation,
  createCategoryValidation,
  getCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,

  subCategoryListValidation,
  createSubCategoryValidation,
  getSubCategoryValidation,
  updateSubCategoryValidation,
  deleteSubCategoryValidation,
  createCourseManagementValidation,
  createProductCmsValidation,
};
