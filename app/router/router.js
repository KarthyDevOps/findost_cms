// import { Router } from "express";
const express = require("express");
const Router = express.Router;
const { routes } = require("../routes/routes");
const {
  verifyToken,
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
  createProductCmsValidation,
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
  createCategory,
  getCategory,
  updateCategory,
  categoryList,
  deleteCategory,
} = require("../controllers/categoryManagement.controller");

const {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  subCategoryList,
  deleteSubCategory,
} = require("../controllers/subCategoryManagement.controller");

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
  productTypeFilterList,
} = require("../controllers/productManagement.controller");

const {
  knowledgeCenterList,
  createKnowledgeCenter,
  getKnowledgeCenter,
  updateKnowledgeCenter,
  deleteKnowledgeCenter,
} = require("../controllers/knowledgeCenterManagement.controller");

const { CreateTicket } = require("../controllers/ticketManagement.controller");

const {
  createCourseManagement,
  updateCourseManagement,
  deleteCourseManagement,
  CourseManagementList,
  getCourseManagement,
  getTrendingCourseList,
  getMycourseList,
  getMyCompletedcourseList,
} = require("../controllers/courseManagement.conntroller");

const {
  createProductCms,
  productCmsList,
  deleteProductCms,
  updateProductCms,
  getProductCms,
} = require("../controllers/productCms.Controller");
const { errHandle } = require("../helpers/index");
const router = Router();

router.get(routes.v1.productCms.list, errHandle(productCmsList));
router.post(routes.v1.productCms.list, errHandle(productCmsList));
router.post(
  routes.v1.productCms.create,

  errHandle(createProductCms)
);
router.get(
  routes.v1.productCms.get,

  errHandle(getProductCms)
);
router.put(
  routes.v1.productCms.update,

  errHandle(updateProductCms)
);
router.delete(
  routes.v1.productCms.delete,

  errHandle(deleteProductCms)
);

//FAQ Management
router.get(
  routes.v1.faqManagement.list,
  [
    verifyToken(["ADMIN", "AP"]),
    verifyAdminRole("faqManagement", "VIEW"),
    faqListValidation,
  ],
  errHandle(faqList)
);
router.post(
  routes.v1.faqManagement.create,
  [
    verifyToken(["ADMIN"]),
   verifyAdminRole("faqManagement", "ADD"),
    createFaqValidation,
  ],
  errHandle(createFaq)
);
router.get(
  routes.v1.faqManagement.get,
  [
    verifyToken(["ADMIN", "AP"]),
    verifyAdminRole("faqManagement", "VIEW"),
    getFaqValidation,
  ],
  errHandle(getFaq)
);
router.put(
  routes.v1.faqManagement.update,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("faqManagement", "UPDATE"),
    updateFaqValidation,
  ],
  errHandle(updateFaq)
);
router.delete(
  routes.v1.faqManagement.delete,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("faqManagement", "DELETE"),
    deleteFaqValidation,
  ],
  errHandle(deleteFaq)
);
//feedback Management
router.get(
  routes.v1.feedbackManagement.list,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("feedbackManagement", "VIEW"),
    feedbackListValidation,
  ],
  errHandle(feedbackList)
);
router.post(
  routes.v1.feedbackManagement.create,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("feedbackManagement", "ADD"),
    createFeedbackValidation,
  ],
  errHandle(createFeedback)
);
router.get(
  routes.v1.feedbackManagement.get,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("feedbackManagement", "VIEW"),
    getFeedbackValidation,
  ],
  errHandle(getFeedback)
);
router.put(
  routes.v1.feedbackManagement.update,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("feedbackManagement", "UPDATE"),
    updateFeedbackValidation,
  ],
  errHandle(updateFeedback)
);
router.delete(
  routes.v1.feedbackManagement.delete,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("feedbackManagement", "DELETE"),
    deleteFeedbackValidation,
  ],
  errHandle(deleteFeedback)
);

//template Management
router.get(
  routes.v1.templateManagement.list,
  [
    verifyToken(["ADMIN", "AP"]),
    verifyAdminRole("templateManagement", "VIEW"),
    templateListValidation,
  ],
  errHandle(templateList)
);
router.post(
  routes.v1.templateManagement.create,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("templateManagement", "ADD"),
    createTemplateValidation,
  ],
  errHandle(createTemplate)
);
router.get(
  routes.v1.templateManagement.get,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("templateManagement", "VIEW"),
    getTemplateValidation,
  ],
  errHandle(getTemplate)
);
router.put(
  routes.v1.templateManagement.update,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("templateManagement", "UPDATE"),
    updateTemplateValidation,
  ],
  errHandle(updateTemplate)
);
router.delete(
  routes.v1.templateManagement.delete,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("templateManagement", "DELETE"),
    deleteTemplateValidation,
  ],
  errHandle(deleteTemplate)
);

//content Management
router.get(
  routes.v1.contentManagement.list,
  [
    verifyToken(["ADMIN", "AP"]),
    verifyAdminRole("contentManagement", "VIEW"),
    contentListValidation,
  ],
  errHandle(contentList)
);
router.post(
  routes.v1.contentManagement.create,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("contentManagement", "ADD"),
    createContentValidation,
  ],
  errHandle(createContent)
);
router.get(
  routes.v1.contentManagement.get,
  [
    verifyToken(["ADMIN", "AP"]),
    verifyAdminRole("contentManagement", "VIEW"),
    getContentValidation,
  ],
  errHandle(getContent)
);
router.put(
  routes.v1.contentManagement.update,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("contentManagement", "UPDATE"),
    updateContentValidation,
  ],
  errHandle(updateContent)
);
router.delete(
  routes.v1.contentManagement.delete,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("contentManagement", "DELETE"),
    deleteContentValidation,
  ],
  errHandle(deleteContent)
);

//site Settings Management
router.post(
  routes.v1.siteSettingsManagement.create,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("siteSettingsManagement", "ADD"),
    createSiteSettingsValidation,
  ],
  errHandle(createSiteSettings)
);
router.get(
  routes.v1.siteSettingsManagement.get,
  [
    //verifyToken([]),
    // verifyAdminRole("siteSettingsManagement", "VIEW"),
    getSiteSettingsValidation,
  ],
  errHandle(getSiteSettings)
);
router.put(
  routes.v1.siteSettingsManagement.update,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("siteSettingsManagement", "UPDATE"),
    updateSiteSettingsValidation,
  ],
  errHandle(updateSiteSettings)
);

//PRODUCT Management
router.get(
  routes.v1.productManagement.ProductTypeFilterlist,
  errHandle(productTypeFilterList)
);

//PRODUCT Management
router.get(
  routes.v1.productManagement.list,
  [
    verifyToken(["ADMIN","AP"]),
    verifyAdminRole("productManagement", "VIEW"),
    productListValidation,
  ],
  errHandle(productList)
);
router.post(
  routes.v1.productManagement.create,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("productManagement", "ADD"),
    createProductValidation,
  ],
  errHandle(createProduct)
);
router.get(
  routes.v1.productManagement.get,
  [
    verifyToken(["ADMIN","AP"]),
    verifyAdminRole("productManagement", "VIEW"),
    getProductValidation,
  ],
  errHandle(getProduct)
);
router.put(
  routes.v1.productManagement.update,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("productManagement", "UPDATE"),
    updateProductValidation,
  ],
  errHandle(updateProduct)
);
router.delete(
  routes.v1.productManagement.delete,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("productManagement", "DELETE"),
    deleteProductValidation,
  ],
  errHandle(deleteProduct)
);

//knowledgeCenter Management
router.get(
  routes.v1.knowledgeCenterManagement.list,
  [
    verifyToken(["ADMIN", "AP"]),
    verifyAdminRole("knowledgeCenterManagement", "VIEW"),
    knowledgeCenterListValidation,
  ],
  errHandle(knowledgeCenterList)
);
router.post(
  routes.v1.knowledgeCenterManagement.create,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("knowledgeCenterManagement", "ADD"),
    createKnowledgeCenterValidation,
  ],
  errHandle(createKnowledgeCenter)
);
router.get(
  routes.v1.knowledgeCenterManagement.get,
  [
    verifyToken(["ADMIN", "AP"]),
    verifyAdminRole("knowledgeCenterManagement", "VIEW"),
    getKnowledgeCenterValidation,
  ],
  errHandle(getKnowledgeCenter)
);
router.put(
  routes.v1.knowledgeCenterManagement.update,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("knowledgeCenterManagement", "UPDATE"),
    updateKnowledgeCenterValidation,
  ],
  errHandle(updateKnowledgeCenter)
);
router.delete(
  routes.v1.knowledgeCenterManagement.delete,
  [
    verifyToken(["ADMIN"]),
    verifyAdminRole("knowledgeCenterManagement", "DELETE"),
    deleteKnowledgeCenterValidation,
  ],
  errHandle(deleteKnowledgeCenter)
);

//category Management
router.get(
  routes.v1.categoryManagement.list,
  [verifyToken(["ADMIN", "AP"]), categoryListValidation],
  errHandle(categoryList)
);
router.post(
  routes.v1.categoryManagement.create,
  [verifyToken(["ADMIN"]), createCategoryValidation],
  errHandle(createCategory)
);
router.get(
  routes.v1.categoryManagement.get,
  [verifyToken(["ADMIN", "AP"]), getCategoryValidation],
  errHandle(getCategory)
);
router.put(
  routes.v1.categoryManagement.update,
  [verifyToken(["ADMIN"]), updateCategoryValidation],
  errHandle(updateCategory)
);
router.delete(
  routes.v1.categoryManagement.delete,
  [verifyToken(["ADMIN"]), deleteCategoryValidation],
  errHandle(deleteCategory)
);

//sub Category Management
router.get(
  routes.v1.subCategoryManagement.list,
  [verifyToken(["ADMIN", "AP"]), subCategoryListValidation],
  errHandle(subCategoryList)
);
router.post(
  routes.v1.subCategoryManagement.create,
  [verifyToken(["ADMIN"]), createSubCategoryValidation],
  errHandle(createSubCategory)
);
router.get(
  routes.v1.subCategoryManagement.get,
  [verifyToken(["ADMIN", "AP"]), getSubCategoryValidation],
  errHandle(getSubCategory)
);
router.put(
  routes.v1.subCategoryManagement.update,
  [verifyToken(["ADMIN"]), updateSubCategoryValidation],
  errHandle(updateCategory)
);
router.delete(
  routes.v1.subCategoryManagement.delete,
  [verifyToken(["ADMIN"]), deleteSubCategoryValidation],
  errHandle(deleteSubCategory)
);

//courseManagement
router.get(routes.v1.courseManagement.list, errHandle(CourseManagementList));
router.post(
  routes.v1.courseManagement.create,
  [verifyToken(["AP"]), createCourseManagementValidation],

  errHandle(createCourseManagement)
);
router.get(routes.v1.courseManagement.get, errHandle(getCourseManagement));
router.put(
  routes.v1.courseManagement.update,
  errHandle(updateCourseManagement)
);
router.delete(
  routes.v1.courseManagement.delete,
  errHandle(deleteCourseManagement)
);

router.get(
  routes.v1.courseManagement.trendingCourseList,
  [verifyToken(["AP"])],
  errHandle(getTrendingCourseList)
);
router.get(
  routes.v1.courseManagement.getMycourseList,
  [verifyToken(["AP"])],
  errHandle(getMycourseList)
);
router.get(
  routes.v1.courseManagement.getMyCompletedcourseList,
  [verifyToken(["AP"])],
  errHandle(getMyCompletedcourseList)
);

module.exports = router;
