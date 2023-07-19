const routes = {
  v1: {
    categoryManagement: {
      list: "/v1/category-management/list",
      create: "/v1/category-management/create",
      get: "/v1/category-management/get",
      update: "/v1/category-management/update",
      delete: "/v1/category-management/delete",
      export: "/v1/category-management/export",
    },
    subCategoryManagement: {
      list: "/v1/sub-category-management/list",
      create: "/v1/sub-category-management/create",
      get: "/v1/sub-category-management/get",
      update: "/v1/sub-category-management/update",
      delete: "/v1/sub-category-management/delete",
      export: "/v1/sub-category-management/export",
    },
    faqManagement: {
      list: "/v1/faq-management/list",
      create: "/v1/faq-management/create",
      get: "/v1/faq-management/get",
      update: "/v1/faq-management/update",
      delete: "/v1/faq-management/delete",
      export: "/v1/faq-management/export",
    },
    courseManagement: {
      list: "/v1/course-management/list",
      create: "/v1/course-management/create",
      get: "/v1/course-management/get",
      update: "/v1/course-management/update",
      delete: "/v1/course-management/delete"
    },
    feedbackManagement: {
      list: "/v1/feedback-management/list",
      create: "/v1/feedback-management/create",
      get: "/v1/feedback-management/get",
      update: "/v1/feedback-management/update",
      delete: "/v1/feedback-management/delete",
      export: "/v1/feedback-management/export",
    },
    templateManagement: {
      list: "/v1/template-management/list",
      create: "/v1/template-management/create",
      get: "/v1/template-management/get",
      update: "/v1/template-management/update",
      delete: "/v1/template-management/delete",
      export: "/v1/template-management/export",
    },
    contentManagement: {
      list: "/v1/content-management/list",
      create: "/v1/content-management/create",
      get: "/v1/content-management/get",
      update: "/v1/content-management/update",
      delete: "/v1/content-management/delete",
      export: "/v1/content-management/export",
    },
    productManagement: {
      list: "/v1/product-management/list",
      create: "/v1/product-management/create",
      get: "/v1/product-management/get",
      update: "/v1/product-management/update",
      delete: "/v1/product-management/delete",
      export: "/v1/product-management/export",
    },
    knowledgeCenterManagement: {
      list: "/v1/knowledgeCenter-management/list",
      create: "/v1/knowledgeCenter-management/create",
      get: "/v1/knowledgeCenter-management/get",
      update: "/v1/knowledgeCenter-management/update",
      delete: "/v1/knowledgeCenter-management/delete",
      export: "/v1/knowledgeCenter-management/export",
    },
    siteSettingsManagement: {
      create: "/v1/siteSettings-management/create",
      get: "/v1/siteSettings-management/get",
      update: "/v1/siteSettings-management/update",
    },
    ticketsManagement: {
      create: "/v1/ticket-management/create",
      get: "/v1/ticket-management/get",
    },
  },
};

module.exports = { routes };
