const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../response/response");
const { createCourseManagementService,getCourseManagementService,CourseManagementListService,deleteCourseManagementService,updateCourseManagementService } = require("../services/courseManagement.service");


const createCourseManagement = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.apId =req?.user?.authorizedPersonId
    console.log("params-->",params)
    const result = await createCourseManagementService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

const getCourseManagement = async (req, res) => {
    const params = req.body;
    params.courseId = req?.query?.courseId;
    const result = await getCourseManagementService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

const updateCourseManagement = async (req, res) => {
    const params = req.body;
    params.templateId = req?.query?.courseId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateTemplateService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

const CourseManagementList = async (req, res) => {
    const params = req?.query;
    if (!params.limit) params.limit = 10
    if (!params.page) params.page = 1
    const result = await templateListService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

const deleteCourseManagement = async (req, res) => {
    const params = req.body;
    if (req.query.id) {
        params.id = req?.query?.id;
    }
    params.ids = req.body.ids;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteTemplateService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};


module.exports = {
    createCourseManagement,
    getCourseManagement,
    updateCourseManagement,
    CourseManagementList,
    deleteCourseManagement,
   
};
