// import { Router } from "express";
const express = require("express");
const Router = express.Router;
const { routes } = require("../routes/routes");
const {
  verifyAdminToken,
  verifyAdminRole,
} = require("../middlewares/authentication");
const {
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
  createSiteSettingsValidation,
  getSiteSettingsValidation,
  updateSiteSettingsValidation,

  contentListValidation,
  createContentValidation,
  getContentValidation,
  updateContentValidation,
  deleteContentValidation,

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

  CreateTicketValidation,
} = require("../validator/validator");
const {
  faqList,
  createFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  exportFaq,
} = require("../controllers/faqManagement.controller");
const {
  feedbackList,
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedbackManagement.controller");
const {
  templateList,
  createTemplate,
  getTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateManagement.controller");
const {
  contentList,
  createContent,
  getContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentManagement.controller");

const {
  createSiteSettings,
  getSiteSettings,
  updateSiteSettings,
} = require("../controllers/siteSettings.controller");
const {
  productList,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  exportProduct,
} = require("../controllers/productManagement.controller");

const {
  knowledgeCenterList,
  createKnowledgeCenter,
  getKnowledgeCenter,
  updateKnowledgeCenter,
  deleteKnowledgeCenter,
} = require("../controllers/knowledgeCenterManagement.controller");

const { CreateTicket } = require("../controllers/ticketManagement.controller");

const { errHandle } = require("../helpers/index");
const router = Router();
//FAQ Management
router.get(
  routes.v1.faqManagement.list,
  [
    verifyAdminToken,
    verifyAdminRole("faqManagement", "VIEW"),
    faqListValidation,
  ],
  errHandle(faqList)
);
router.post(
  routes.v1.faqManagement.create,
  [
    verifyAdminToken,
    verifyAdminRole("faqManagement", "ADD"),
    createFaqValidation,
  ],
  errHandle(createFaq)
);
router.get(
  routes.v1.faqManagement.get,
  [
    verifyAdminToken,
    verifyAdminRole("faqManagement", "VIEW"),
    getFaqValidation,
  ],
  errHandle(getFaq)
);
router.put(
  routes.v1.faqManagement.update,
  [
    verifyAdminToken,
    verifyAdminRole("faqManagement", "UPDATE"),
    updateFaqValidation,
  ],
  errHandle(updateFaq)
);
router.delete(
  routes.v1.faqManagement.delete,
  [
    verifyAdminToken,
    verifyAdminRole("faqManagement", "DELETE"),
    deleteFaqValidation,
  ],
  errHandle(deleteFaq)
);
//feedback Management
router.get(
  routes.v1.feedbackManagement.list,
  [
    verifyAdminToken,
    verifyAdminRole("feedbackManagement", "VIEW"),
    feedbackListValidation,
  ],
  errHandle(feedbackList)
);
router.post(
  routes.v1.feedbackManagement.create,
  [
    verifyAdminToken,
    verifyAdminRole("feedbackManagement", "ADD"),
    createFeedbackValidation,
  ],
  errHandle(createFeedback)
);
router.get(
  routes.v1.feedbackManagement.get,
  [
    verifyAdminToken,
    verifyAdminRole("feedbackManagement", "VIEW"),
    getFeedbackValidation,
  ],
  errHandle(getFeedback)
);
router.put(
  routes.v1.feedbackManagement.update,
  [
    verifyAdminToken,
    verifyAdminRole("feedbackManagement", "UPDATE"),
    updateFeedbackValidation,
  ],
  errHandle(updateFeedback)
);
router.delete(
  routes.v1.feedbackManagement.delete,
  [
    verifyAdminToken,
    verifyAdminRole("feedbackManagement", "DELETE"),
    deleteFeedbackValidation,
  ],
  errHandle(deleteFeedback)
);

//template Management
router.get(
  routes.v1.templateManagement.list,
  [
    verifyAdminToken,
    verifyAdminRole("templateManagement", "VIEW"),
    templateListValidation,
  ],
  errHandle(templateList)
);
router.post(
  routes.v1.templateManagement.create,
  [
    verifyAdminToken,
    verifyAdminRole("templateManagement", "ADD"),
    createTemplateValidation,
  ],
  errHandle(createTemplate)
);
router.get(
  routes.v1.templateManagement.get,
  [
    verifyAdminToken,
    verifyAdminRole("templateManagement", "VIEW"),
    getTemplateValidation,
  ],
  errHandle(getTemplate)
);
router.put(
  routes.v1.templateManagement.update,
  [
    verifyAdminToken,
    verifyAdminRole("templateManagement", "UPDATE"),
    updateTemplateValidation,
  ],
  errHandle(updateTemplate)
);
router.delete(
  routes.v1.templateManagement.delete,
  [
    verifyAdminToken,
    verifyAdminRole("templateManagement", "DELETE"),
    deleteTemplateValidation,
  ],
  errHandle(deleteTemplate)
);

//content Management
router.get(
  routes.v1.contentManagement.list,
  [
    verifyAdminToken,
    verifyAdminRole("contentManagement", "VIEW"),
    contentListValidation,
  ],
  errHandle(contentList)
);
router.post(
  routes.v1.contentManagement.create,
  [
    verifyAdminToken,
    verifyAdminRole("contentManagement", "ADD"),
    createContentValidation,
  ],
  errHandle(createContent)
);
router.get(
  routes.v1.contentManagement.get,
  [
    verifyAdminToken,
    verifyAdminRole("contentManagement", "VIEW"),
    getContentValidation,
  ],
  errHandle(getContent)
);
router.put(
  routes.v1.contentManagement.update,
  [
    verifyAdminToken,
    verifyAdminRole("contentManagement", "UPDATE"),
    updateContentValidation,
  ],
  errHandle(updateContent)
);
router.delete(
  routes.v1.contentManagement.delete,
  [
    verifyAdminToken,
    verifyAdminRole("contentManagement", "DELETE"),
    deleteContentValidation,
  ],
  errHandle(deleteContent)
);

//site Settings Management
router.post(
  routes.v1.siteSettingsManagement.create,
  [
    verifyAdminToken,
    verifyAdminRole("siteSettingsManagement", "ADD"),
    createSiteSettingsValidation,
  ],
  errHandle(createSiteSettings)
);
router.get(
  routes.v1.siteSettingsManagement.get,
  [
    verifyAdminToken,
    verifyAdminRole("siteSettingsManagement", "VIEW"),
    getSiteSettingsValidation,
  ],
  errHandle(getSiteSettings)
);
router.put(
  routes.v1.siteSettingsManagement.update,
  [
    verifyAdminToken,
    verifyAdminRole("siteSettingsManagement", "UPDATE"),
    updateSiteSettingsValidation,
  ],
  errHandle(updateSiteSettings)
);

//PRODUCT Management
router.get(
  routes.v1.productManagement.list,
  [
    verifyAdminToken,
    verifyAdminRole("productManagement", "VIEW"),
    productListValidation,
  ],
  errHandle(productList)
);
router.post(
  routes.v1.productManagement.create,
  [
    verifyAdminToken,
    verifyAdminRole("productManagement", "ADD"),
    createProductValidation,
  ],
  errHandle(createProduct)
);
router.get(
  routes.v1.productManagement.get,
  [
    verifyAdminToken,
    verifyAdminRole("productManagement", "VIEW"),
    getProductValidation,
  ],
  errHandle(getProduct)
);
router.put(
  routes.v1.productManagement.update,
  [
    verifyAdminToken,
    verifyAdminRole("productManagement", "UPDATE"),
    updateProductValidation,
  ],
  errHandle(updateProduct)
);
router.delete(
  routes.v1.productManagement.delete,
  [
    verifyAdminToken,
    verifyAdminRole("productManagement", "DELETE"),
    deleteProductValidation,
  ],
  errHandle(deleteProduct)
);

//knowledgeCenter Management
router.get(
  routes.v1.knowledgeCenterManagement.list,
  [
    verifyAdminToken,
    verifyAdminRole("knowledgeCenterManagement", "VIEW"),
    knowledgeCenterListValidation,
  ],
  errHandle(knowledgeCenterList)
);
router.post(
  routes.v1.knowledgeCenterManagement.create,
  [
    verifyAdminToken,
    verifyAdminRole("knowledgeCenterManagement", "ADD"),
    createKnowledgeCenterValidation,
  ],
  errHandle(createKnowledgeCenter)
);
router.get(
  routes.v1.knowledgeCenterManagement.get,
  [
    verifyAdminToken,
    verifyAdminRole("knowledgeCenterManagement", "VIEW"),
    getKnowledgeCenterValidation,
  ],
  errHandle(getKnowledgeCenter)
);
router.put(
  routes.v1.knowledgeCenterManagement.update,
  [
    verifyAdminToken,
    verifyAdminRole("knowledgeCenterManagement", "UPDATE"),
    updateKnowledgeCenterValidation,
  ],
  errHandle(updateKnowledgeCenter)
);
router.delete(
  routes.v1.knowledgeCenterManagement.delete,
  [
    verifyAdminToken,
    verifyAdminRole("knowledgeCenterManagement", "DELETE"),
    deleteKnowledgeCenterValidation,
  ],
  errHandle(deleteKnowledgeCenter)
);

//Ticket management
router.post(
  routes.v1.ticketsManagement.create,
  [verifyAdminToken, CreateTicketValidation],
  errHandle(CreateTicket)
);

router.get(
  routes.v1.ticketsManagement.get,
  [verifyAdminToken],
  errHandle(CreateTicket)
);

module.exports = router;
