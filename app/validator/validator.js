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
    category: joi.string(),
    subCategory: joi.string(),
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
    faqId: joi.string().allow(null).allow(""),
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


module.exports = {
  bodyParamValidation,
  queryParamValidation,
 
  faqListValidation,
  createFaqValidation,
  getFaqValidation,
  updateFaqValidation,
  deleteFaqValidation,
  
};
