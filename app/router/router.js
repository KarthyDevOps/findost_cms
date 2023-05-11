// import { Router } from "express";
const express = require("express");
const Router = express.Router;
const { routes } = require("../routes/routes");
const { verifyAdminToken,verifyAdminRole } = require("../middlewares/authentication");
const {
  faqListValidation,
  createFaqValidation,
  getFaqValidation,
  updateFaqValidation,
  deleteFaqValidation,
  
} = require("../validator/validator");

const {
  faqList,
  createFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  exportFaq,
} = require("../controllers/faqManagement.controller");

const { errHandle } = require("../helpers/index");

const router = Router();
//FAQ Management
router.get(
  routes.v1.faqManagement.list,
  [verifyAdminToken,verifyAdminRole("faqManagement","VIEW"), faqListValidation],
  errHandle(faqList)
);
router.post(
  routes.v1.faqManagement.create,
  [verifyAdminToken,verifyAdminRole("faqManagement","ADD"), createFaqValidation],
  errHandle(createFaq)
);
router.get(
  routes.v1.faqManagement.get,
  [verifyAdminToken,verifyAdminRole("faqManagement","VIEW"), getFaqValidation],
  errHandle(getFaq)
);
router.put(
  routes.v1.faqManagement.update,
  [verifyAdminToken,verifyAdminRole("faqManagement","UPDATE"), updateFaqValidation],
  errHandle(updateFaq)
);
router.delete(
  routes.v1.faqManagement.delete,
  [verifyAdminToken,verifyAdminRole("faqManagement","DELETE"), deleteFaqValidation],
  errHandle(deleteFaq)
);

module.exports = router;
